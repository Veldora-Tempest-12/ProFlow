from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import TokenObtainPairWithLoginView
from accounts.views import (
    UserViewSet,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    EmailVerificationView,
    ResendVerificationEmailView,
    CheckAuthView,
    ProfileView,
)
from django.urls import path, include


router = DefaultRouter()
router.register(r"user", UserViewSet, basename="user")


urlpatterns = [
    path("", include(router.urls)),
    path("token/", TokenObtainPairWithLoginView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path(
        "password-reset/",
        PasswordResetRequestView.as_view(),
        name="password-reset-request",
    ),
    path(
        "password-reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="password-reset-confirm",
    ),
    path("verify-email/", EmailVerificationView.as_view(), name="email-verify"),
    path(
        "resend-verification/",
        ResendVerificationEmailView.as_view(),
        name="resend-email-verify",
    ),
    path("auth/check/", CheckAuthView.as_view(), name="auth-check"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
