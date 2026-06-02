from django.urls import include, path
from rest_framework_nested import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import ProfileViewSet, ReviewViewSet

router = routers.DefaultRouter()
router.register("profiles", ProfileViewSet, basename="profiles")
agent_router = routers.NestedDefaultRouter(router, "profiles", lookup="profile")
agent_router.register("reviews", ReviewViewSet, basename="reviews")
urlpatterns = [
    path("", include(router.urls)),
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
] + agent_router.urls
