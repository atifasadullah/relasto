from django.contrib import admin
from .models import Profile, Review, User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


# Register your models here.
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ["id", "email", "username", "first_name", "last_name"]


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["id", "is_agent", "birth_date", "created_at", "user"]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "rating",
        "comment",
        "reviewer",
        "agent",
        "created_at",
        "updated_at",
    ]
