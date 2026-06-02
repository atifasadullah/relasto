from django.db.models import Avg
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
)
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer, ReviewSerializer
from .models import Profile, Review


# Create your views here.
class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.select_related("user").annotate(
        average_rating=Avg("user__agent_reviews__rating")
    )
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        profile = get_object_or_404(Profile, pk=self.kwargs["profile_pk"])
        return Review.objects.filter(agent=profile.user).order_by("-created_at")

    def perform_create(self, serializer):
        profile = get_object_or_404(Profile, pk=self.kwargs["profile_pk"])
        if not profile.is_agent:
            raise ValidationError({"response": "Profile is not an agent."})
        if Review.objects.filter(reviewer=self.request.user):
            raise ValidationError(
                {"response": "Profile has already reviewed the agent."}
            )
        serializer.save(reviewer=self.request.user, agent=profile.user)
