import django_filters
from .models import Property, PropertyImage


class PropertyFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    city = django_filters.CharFilter(lookup_expr="icontains")
    status = django_filters.ChoiceFilter(choices=Property.STATUS_CHOICES)
    agent = django_filters.NumberFilter()

    class Meta:
        model = Property
        fields = ["type", "state"]
