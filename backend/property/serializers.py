from django.utils import timezone
from django.db.models import Q
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.exceptions import ValidationError
from core.serializers import UserSerializer
from .models import Property, PropertyImage, VisitRequest


class PropertyImageSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = ["image"]

    def get_image(self, obj):
        if obj.image and str(obj.image).startswith(("http://", "https://")):
            return str(obj.image)
        return obj.image.url if obj.image else None


class PropertySerializer(ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            "slug",
            "title",
            "description",
            "price",
            "status",
            "type",
            "street",
            "city",
            "state",
            "country",
            "zip",
            "created_at",
            "updated_at",
            "images",
            "features",
            "agent",
        ]
        read_only_fields = ["slug", "agent"]


class VisitRequestSerializer(ModelSerializer):
    agent = UserSerializer(source="property.agent", read_only=True)

    class Meta:
        model = VisitRequest
        fields = [
            "id",
            "property",
            "user",
            "preferred_date",
            "message",
            "status",
            "agent",
            "is_reviewed",
            "reviewed_at",
            "is_completed",
            "completed_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["user"]

    ALLOWED_TRANSITIONS = {
        "P": ["Con", "Can", "D"],
        "Con": ["Com", "Can", "D"],
        "D": [],
        "Can": [],
        "Com": [],
    }
    TERMINAL_STATUSES = ["D", "Can", "Com"]

    def validate(self, attrs):
        new_status = attrs.get("status")
        user = self.context["request"].user
        if self.instance and new_status is not None:
            old_status = self.instance.status
            allowed = self.ALLOWED_TRANSITIONS.get(old_status, [])
            if new_status not in allowed:
                raise ValidationError(
                    {
                        "response": f"Transition from '{old_status}' to '{new_status}' is not allowed."
                    }
                )
        if not self.instance:
            if VisitRequest.objects.filter(
                Q(user=user),
                Q(property=attrs.get("property")),
                ~Q(status__in=self.TERMINAL_STATUSES),
            ).exists():
                raise ValidationError(
                    {"response": "Visit request is already created by you"}
                )

        return attrs

    def update(self, instance, validated_data):
        if validated_data.get("status") == "Com" and instance.status != "Com":
            instance.is_completed = True
            instance.completed_at = timezone.now()
        return super().update(instance, validated_data)
