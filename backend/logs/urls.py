from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TimeLogViewSet, ActivityLogViewSet

router = DefaultRouter()
router.register(r'timelogs', TimeLogViewSet)
router.register(r'activitylogs', ActivityLogViewSet)

urlpatterns = [path('', include(router.urls))]
