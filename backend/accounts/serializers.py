from rest_framework import serializers
from django.core.exceptions import ValidationError
import re
import uuid
from django.utils import timezone
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, EmailVerificationToken


def validate_custom_password(value):
    if len(value) < 8:
        raise ValidationError("Password must be at least 8 characters long.")
    if not re.search(r"[A-Z]", value):
        raise ValidationError("Password must contain at least one uppercase letter.")
    if not re.search(r"[a-z]", value):
        raise ValidationError("Password must contain at least one lowercase letter.")
    if not re.search(r"\d", value):
        raise ValidationError("Password must contain at least one digit.")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
        raise ValidationError("Password must contain at least one special character.")
    return value


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_custom_password]
    )
    confirm_password = serializers.CharField(
        write_only=True, required=False, allow_blank=True
    )

    def validate(self, data):
        password = data.get("password")
        confirm = data.get("confirm_password")
        if password:
            if not confirm:
                raise serializers.ValidationError(
                    {"confirm_password": "Please confirm your password."}
                )
            if password != confirm:
                raise serializers.ValidationError(
                    {"confirm_password": "Passwords do not match."}
                )
        return data

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "avatar_url",
            "status",
            "is_verified",
            "created_at",
            "updated_at",
            "password",
            "confirm_password",
        ]
        read_only_fields = ("id", "created_at", "updated_at")

    def create(self, validated_data):
        from django.core.mail import send_mail
        from django.conf import settings

        password = validated_data.pop("password")
        validated_data.pop("confirm_password", None)
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        # Generate email verification token
        token = uuid.uuid4().hex
        EmailVerificationToken.objects.create(user=user, token=token)
        # Send verification email (subject/template simplified)
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
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        validated_data.pop("confirm_password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class TokenObtainPairWithLoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        User.objects.filter(pk=self.user.pk).update(last_login=timezone.now())
        return data


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField()
    password = serializers.CharField(
        write_only=True, validators=[validate_custom_password]
    )
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data.get("password") != data.get("confirm_password"):
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        return data
