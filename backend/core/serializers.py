from django.db.models import Avg
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from djoser.serializers import (
    UserSerializer as BaseUserSerializer,
    UserCreateSerializer as BaseUserCreateSerializer,
)
from .models import Profile, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "rating",
            "comment",
            "reviewer",
            "agent",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["agent", "reviewer"]

    def create(self, validated_data):
        reviewer = validated_data.get("reviewer")
        is_agent = False
        if reviewer and hasattr(reviewer, "profile"):
            is_agent = reviewer.profile.is_agent

        if not is_agent:
            return Review.objects.create(**validated_data)
        else:
            raise ValidationError({"response": "Reviewer can not be an agent."})


class ProfileSerializer(serializers.ModelSerializer):
    agent_reviews = ReviewSerializer(
        many=True, read_only=True, source="user.agent_reviews"
    )
    average_rating = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "gender",
            "user",
            "is_agent",
            "birth_date",
            "created_at",
            "agent_reviews",
            "average_rating",
        ]
        read_only_fields = ["user"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if not instance.is_agent:
            data.pop("agent_reviews", None)
            data.pop("average_rating", None)
        return data


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ["id", "username", "password", "email", "first_name", "last_name"]


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ["username", "email", "first_name", "last_name"]
