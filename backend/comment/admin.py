from django.contrib import admin

from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("author", "task", "created_at", "short_body")
    list_filter = ("author", "task")
    search_fields = ("author__username", "task__title", "body")
    autocomplete_fields = ("author", "task")
    readonly_fields = ("short_body",)

    def short_body(self, obj):
        return (obj.body[:75] + "…") if len(obj.body) > 75 else obj.body
    short_body.short_description = "Body"

