from rest_framework import serializers
from .models import Task, SubTask, TaskDependency


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "project",
            "title",
            "description",
            "status",
            "priority",
            "assignee",
            "due_date",
            "estimated_hours",
            "logged_hours",
            "parent_task",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("id", "created_at", "updated_at")


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ["id", "task", "title", "is_completed", "created_at"]
        read_only_fields = ("id", "created_at")


class TaskDependencySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskDependency
        fields = ["id", "blocker", "blocked", "created_at"]
        read_only_fields = ("id", "created_at")
