from django.contrib import admin

from .models import Task, SubTask, TaskDependency


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "project",
        "status",
        "priority",
        "assignee",
        "due_date",
        "created_at",
    )
    list_filter = ("status", "priority", "assignee", "project")
    search_fields = ("title", "description")
    autocomplete_fields = ("project", "assignee", "parent_task")


@admin.register(SubTask)
class SubTaskAdmin(admin.ModelAdmin):
    list_display = ("title", "task", "is_completed", "created_at")
    list_filter = ("is_completed", "task")
    search_fields = ("title",)
    autocomplete_fields = ("task",)


@admin.register(TaskDependency)
class TaskDependencyAdmin(admin.ModelAdmin):
    list_display = ("blocker", "blocked", "created_at")
    list_filter = ("blocker", "blocked")
    autocomplete_fields = ("blocker", "blocked")
