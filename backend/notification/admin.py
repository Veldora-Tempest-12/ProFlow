from django.contrib import admin

from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("user", "message", "is_read", "created_at", "task", "project")
    list_filter = ("is_read", "user", "task", "project")
    search_fields = ("user__username", "message")
    autocomplete_fields = ("user", "task", "project")

