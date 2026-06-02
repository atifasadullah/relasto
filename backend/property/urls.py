from .views import PropertyImageViewSet, PropertyViewSet, VisitRequestViewSet
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter

router = DefaultRouter()
router.register("properties", PropertyViewSet, basename="properties")
images_router = NestedDefaultRouter(router, "properties", lookup="property")
images_router.register("images", PropertyImageViewSet, basename="images")
router.register("visit-request", VisitRequestViewSet, basename="visit-request")
urlpatterns = router.urls + images_router.urls
