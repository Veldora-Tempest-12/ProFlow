from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TemplateViewSet, ProjectViewSet, ProjectMemberViewSet

router = DefaultRouter()
router.register(r"templates", TemplateViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"project-members", ProjectMemberViewSet)

urlpatterns = [path("", include(router.urls))]
