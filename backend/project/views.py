from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import IsVerified, OwnerOrAdminPermission
from .models import Template, Project, ProjectMember
from .serializers import TemplateSerializer, ProjectSerializer, ProjectMemberSerializer


class TemplateViewSet(viewsets.ModelViewSet):
    from .permissions import OwnerOrAdminPermission, IsVerified

    def get_permissions(self):
        """Return permission classes based on action."""
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        if self.action == "create":
            return [permissions.IsAuthenticated(), IsVerified()]
        if self.action == "clone":
            return [permissions.IsAuthenticated()]
        if self.action in ["update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated(), OwnerOrAdminPermission()]
        return super().get_permissions()

    authentication_classes = [JWTAuthentication]
    queryset = Template.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TemplateSerializer

    @action(detail=True, methods=["post"], url_path="clone")
    def clone(self, request, pk=None):
        original = self.get_object()
        data = {
            "name": request.data.get("name", f"{original.name} copy"),
            "description": original.description,
            "languages": original.languages,
            "frameworks": original.frameworks,
            "category": original.category,
            "created_by": request.user.id if request.user.is_authenticated else None,
            "visibility": original.visibility,
            "config": original.config,
            "is_active": True,
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


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
