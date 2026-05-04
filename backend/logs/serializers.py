from rest_framework import serializers
from .models import TimeLog, ActivityLog


class TimeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeLog
        fields = ["id", "task", "user", "hours", "log_date", "created_at"]
        read_only_fields = ("id", "created_at")


class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = [
            "id",
            "project",
            "task",
            "actor",
            "action",
            "details",
            "created_at",
        ]
        read_only_fields = ("id", "created_at")
