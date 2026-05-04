from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Task, SubTask, TaskDependency
from .serializers import TaskSerializer, SubTaskSerializer, TaskDependencySerializer


class TaskViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny]


class SubTaskViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerializer
    permission_classes = [permissions.AllowAny]


class TaskDependencyViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = TaskDependency.objects.all()
    serializer_class = TaskDependencySerializer
    permission_classes = [permissions.AllowAny]
