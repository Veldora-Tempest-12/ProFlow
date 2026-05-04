from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Template, Project, ProjectMember
from .serializers import TemplateSerializer, ProjectSerializer, ProjectMemberSerializer


class TemplateViewSet(viewsets.ModelViewSet):

    def perform_update(self, serializer):
        if self.get_object().is_system:
            raise PermissionDenied("System templates cannot be modified.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.is_system:
            raise PermissionDenied("System templates cannot be deleted.")
        instance.delete()

    @action(detail=True, methods=["post"], url_path='clone')
    def clone(self, request, pk=None):
        original = self.get_object()
        data = {
            "name": request.data.get("name", f"{original.name} copy"),
            "description": original.description,
            "category": original.category,
            "created_by": request.user.id if request.user.is_authenticated else None,
            "visibility": original.visibility,
            "config": original.config,
            "is_active": True,
            "is_system": False,
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
    authentication_classes = [JWTAuthentication]
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    permission_classes = [permissions.AllowAny]


class ProjectViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]


class ProjectMemberViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = ProjectMember.objects.all()
    serializer_class = ProjectMemberSerializer
    permission_classes = [permissions.AllowAny]
