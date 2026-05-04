from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TaskViewSet, SubTaskViewSet, TaskDependencyViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'subtasks', SubTaskViewSet)
router.register(r'dependencies', TaskDependencyViewSet)

urlpatterns = [path('', include(router.urls))]
