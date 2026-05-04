from django.contrib import admin
from .models import Template, Project, ProjectMember

admin.site.register(Template)
admin.site.register(Project)
admin.site.register(ProjectMember)
