from django.contrib import admin

from .models import TimeLog, ActivityLog


@admin.register(TimeLog)
class TimeLogAdmin(admin.ModelAdmin):
    list_display = ("task", "user", "hours", "log_date", "created_at")
    list_filter = ("task", "user", "log_date")
    search_fields = ("task__title", "user__username")
    autocomplete_fields = ("task", "user")


@admin.register(ActivityLog)
class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ("project", "task", "actor", "action", "created_at")
    list_filter = ("project", "action", "actor")
    search_fields = ("project__name", "task__title", "actor__username", "action")
    autocomplete_fields = ("project", "task", "actor")
