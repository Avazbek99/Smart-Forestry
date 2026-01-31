from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ForestCompartmentViewSet, AppealViewSet, UserViewSet, TaskViewSet, LeaseContractViewSet

router = DefaultRouter()
router.register(r'forest-compartments', ForestCompartmentViewSet)
router.register(r'appeals', AppealViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'contracts', LeaseContractViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
