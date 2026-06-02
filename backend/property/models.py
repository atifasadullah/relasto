import random
import string
from django.utils import timezone
from slugify import slugify
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.conf import settings


# Create your models here.
class Property(models.Model):
    STATUS_CHOICES = [("S", "Sale"), ("R", "Rent"), ("L", "Lease"), ("A", "Auction")]
    TYPE_CHOICES = [
        ("R", "Residential"),
        ("C", "Commercial"),
        ("I", "Industrial"),
        ("A", "Agricultural"),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.FloatField(validators=[MaxValueValidator(999999999.99)])
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=50, default="US")
    zip = models.CharField(max_length=20, null=True, blank=True)
    features = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(
        max_length=500, blank=True, primary_key=True, editable=False
    )
    agent = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="properties"
    )

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            suffix = "".join(
                random.choices(string.ascii_lowercase + string.digits, k=6)
            )
            self.slug = f"{slugify(f'{self.title} {self.city}')}-{suffix}"
        super().save(*args, **kwargs)


class PropertyImage(models.Model):
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="property/images")

    def __str__(self):
        return self.image.name


class VisitRequest(models.Model):
    STATUS_CHOICES = [
        ("PE", "Pending"),
        ("CO", "Confirmed"),
        ("CM", "Completed"),
        ("DE", "Declined"),
        ("CN", "Cancelled"),
    ]

    def get_today():
        return timezone.now().date()

    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_visit"
    )
    preferred_date = models.DateField(
        validators=[MinValueValidator(limit_value=get_today)]
    )
    message = models.CharField(max_length=1000, null=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default="P")
    is_reviewed = models.BooleanField(default=False)
    reviewed_at = models.DateTimeField(null=True)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
