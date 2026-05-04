from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import TimeLog, ActivityLog
from .serializers import TimeLogSerializer, ActivityLogSerializer


class TimeLogViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = TimeLog.objects.all()
    serializer_class = TimeLogSerializer
    permission_classes = [permissions.AllowAny]


class ActivityLogViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    permission_classes = [permissions.AllowAny]
