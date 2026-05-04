from rest_framework import serializers
from .models import Template, Project, ProjectMember


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = [
            "id",
            "name",
            "description",
            "category",
            "created_by",
            "visibility",
            "config",
            "usage_count",
            "rating",
            "ratings_count",
            "is_active",
            "is_system",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("id", "created_at", "updated_at")


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "owner",
            "name",
            "description",
            "visibility",
            "template",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("id", "created_at", "updated_at")


class ProjectMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMember
        fields = [
            "id",
            "project",
            "user",
            "role",
            "joined_at",
        ]
        read_only_fields = ("id", "joined_at")
