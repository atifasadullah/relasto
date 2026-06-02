from django.contrib import admin
from .models import Property, PropertyImage, VisitRequest


# Register your models here.
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    class Meta:
        list_display = ["slug", "title", "agent_id", "type", "status"]
        ordering = ["created_at"]


admin.site.register(PropertyImage)


@admin.register(VisitRequest)
class VisitRequestAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "property",
        # "agent",
        "user",
        "preferred_date",
        "message",
        "status",
        "is_reviewed",
        "reviewed_at",
        "is_completed",
        "completed_at",
        "created_at",
        "updated_at",
    ]
