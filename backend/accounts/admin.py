from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, EmailVerificationToken, PasswordResetToken


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "is_staff",
        "is_superuser",
        "is_verified",
        "status",
        "last_login",
    )
    list_filter = ("is_staff", "is_superuser", "is_verified", "status")
    search_fields = ("username", "email")
    readonly_fields = ("id", "date_joined", "last_login")
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("avatar_url", "status", "is_verified")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("avatar_url", "status")}),
    )


@admin.register(EmailVerificationToken)
class EmailVerificationTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "token", "created_at", "used")
    list_filter = ("used", "created_at")
    search_fields = ("user__email", "token")
    readonly_fields = ("created_at",)


@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "token", "created_at", "used")
    list_filter = ("used", "created_at")
    search_fields = ("user__email", "token")
    readonly_fields = ("created_at",)
