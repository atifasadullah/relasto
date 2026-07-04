from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from rest_framework.validators import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import (
    PropertyImageSerializer,
    PropertySerializer,
    VisitRequestSerializer,
)
from .filters import PropertyFilter
from .models import Property, PropertyImage, VisitRequest


# Create your views here.
class PropertyViewSet(ModelViewSet):
    queryset = Property.objects.prefetch_related("images").all()
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = PropertyFilter
    search_fields = ["title", "description"]
    # lookup_field = "slug"

    def perform_create(self, serializer):
        if not self.request.user.profile.is_agent:
            raise ValidationError({"response": "Only agents can list properties."})
        serializer.save(agent=self.request.user)

    def perform_update(self, serializer):
        if not self.request.user.profile.is_agent:
            raise ValidationError({"response": "Only agents can update properties."})
        if self.request.user != serializer.instance.agent:
            raise ValidationError(
                {"response": "You can only edit your own properties."}
            )
        serializer.save()


class PropertyImageViewSet(ModelViewSet):
    serializer_class = PropertyImageSerializer

    def get_queryset(self):
        property = get_object_or_404(Property, slug=self.kwargs["property_pk"])
        return PropertyImage.objects.filter(property=property)

    def perform_create(self, serializer):
        property = self.kwargs["property_pk"]
        property_object = Property.objects.get(pk=property)
        if property and property_object.agent != self.request.user:
            raise ValidationError(
                {"response": "Only agents can create property's image."}
            )
        q = list(PropertyImage.objects.filter(property=property))
        secondary_images = 0
        for i in list(range(len(q))):
            if serializer.validated_data.get("rank") == "P" and q[i].rank == "P":
                raise ValidationError(
                    {
                        "response": "Primary image is already settled, you can replace it with another."
                    }
                )
            if serializer.validated_data.get("rank") == "S" and q[i].rank == "P":
                secondary_images += 1
                if secondary_images + 1 == 2:
                    raise ValidationError(
                        {
                            "response": "Two Secondary images are already settled, you can replace them with another ones."
                        }
                    )
        serializer.save(property=property_object)

    def perform_update(self, serializer):
        property = serializer.validated_data.get("property")
        if property and property.agent != self.request.user:
            raise ValidationError(
                {"response": "Only agents can update property's image."}
            )
        serializer.save()

    def perform_destroy(self, instance):
        property = instance.property
        if property and property.agent != self.request.user:
            raise ValidationError(
                {"response": "Only agents can delete property's image."}
            )
        return super().perform_destroy(instance)


class VisitRequestViewSet(ModelViewSet):
    queryset = VisitRequest.objects.select_related(
        "property",
        "property__agent",
    )
    serializer_class = VisitRequestSerializer

    def perform_create(self, serializer):
        if self.request.user.profile.is_agent:
            raise ValidationError(
                {"response": "An agent can not create visit request."}
            )
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        instance = self.get_object()
        user = self.request.user
        if user.profile.is_agent:
            if "status" not in serializer.validated_data:
                raise ValidationError({"response": "Agent can only update the status."})
            if instance.property.agent != user:
                raise ValidationError(
                    {"response": "You can only manage visits for your own properties."}
                )
        else:
            if instance.user != user:
                raise ValidationError(
                    {"response": "You can only edit your own visit requests."}
                )
        serializer.save()
