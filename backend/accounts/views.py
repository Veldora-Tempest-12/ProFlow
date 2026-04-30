from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
import uuid
from .models import User, PasswordResetToken, UserStatus
from .serializers import (
    UserSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    EmailVerificationToken,
    TokenObtainPairWithLoginSerializer,
)

from rest_framework_simplejwt.views import TokenObtainPairView


class TokenObtainPairWithLoginView(TokenObtainPairView):
    """Returns JWT pair and updates the user's `last_login` field."""

    serializer_class = TokenObtainPairWithLoginSerializer


class OwnerOrAdminPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or request.user.is_staff:
            return True
        return obj.id == request.user.id


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.IsAuthenticated()]
        if self.action in ["update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated(), OwnerOrAdminPermission()]
        return super().get_permissions()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.is_superuser or request.user.is_staff:
            return super().destroy(request, *args, **kwargs)
        if instance.id == request.user.id:
            if instance.status != UserStatus.INACTIVE:
                instance.status = UserStatus.INACTIVE
                instance.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(
                {"detail": "User already inactive."}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"detail": "Not authorized to delete this user."},
            status=status.HTTP_403_FORBIDDEN,
        )


class PasswordResetRequestView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"detail": "User with this email does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        token = uuid.uuid4().hex
        PasswordResetToken.objects.create(user=user, token=token)
        reset_link = (
            f"{settings.FRONTEND_URL}/reset-password/?token={token}"
            if hasattr(settings, "FRONTEND_URL")
            else f"http://localhost:8000/reset-password/?token={token}"
        )
        send_mail(
            subject="Password Reset Request",
            message=f"Use this link to reset your password: {reset_link}",
            from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@example.com"),
            recipient_list=[user.email],
            fail_silently=False,
        )
        return Response(
            {"detail": "Password reset token generated.", "token": token},
            status=status.HTTP_200_OK,
        )


class PasswordResetConfirmView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["token"]
        password = serializer.validated_data["password"]
        try:
            reset_entry = PasswordResetToken.objects.get(token=token, used=False)
        except PasswordResetToken.DoesNotExist:
            return Response(
                {"detail": "Invalid or used token."}, status=status.HTTP_400_BAD_REQUEST
            )
        user = reset_entry.user
        user.set_password(password)
        user.save()
        reset_entry.used = True
        reset_entry.save()
        return Response(
            {"detail": "Password has been reset successfully."},
            status=status.HTTP_200_OK,
        )


class EmailVerificationView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.query_params.get("token")
        if not token:
            return Response(
                {"detail": "Token query parameter missing."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        from .models import EmailVerificationToken

        try:
            verification = EmailVerificationToken.objects.get(token=token, used=False)
        except EmailVerificationToken.DoesNotExist:
            return Response(
                {"detail": "Invalid or already used token."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = verification.user
        user.is_verified = True
        user.save()
        verification.used = True
        verification.save()
        return Response(
            {"detail": "Email verified successfully."}, status=status.HTTP_200_OK
        )


class ResendVerificationEmailView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        if not email:
            return Response(
                {"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST
            )
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"detail": "User with this email does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        if user.is_verified:
            return Response(
                {"detail": "User is already verified."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        EmailVerificationToken.objects.filter(user=user, used=False).update(used=True)
        token = uuid.uuid4().hex
        EmailVerificationToken.objects.create(user=user, token=token)
        from django.core.mail import send_mail
        from django.conf import settings

        verification_link = (
            f"{settings.FRONTEND_URL}/verify-email/?token={token}"
            if hasattr(settings, "FRONTEND_URL")
            else f"http://localhost:8000/verify-email/?token={token}"
        )
        send_mail(
            subject="Verify your email address",
            message=f"Please verify your email by clicking the following link: {verification_link}",
            from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@example.com"),
            recipient_list=[user.email],
            fail_silently=False,
        )
        return Response(
            {"detail": "Verification email sent."}, status=status.HTTP_200_OK
        )
