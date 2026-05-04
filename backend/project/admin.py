from django.contrib import admin
from .models import Template, Project, ProjectMember

admin.site.register(Template)
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    search_fields = ("name", "description")
    list_display = ("name", "owner", "status", "visibility")
    list_filter = ("status", "visibility", "owner")

admin.site.register(ProjectMember)
