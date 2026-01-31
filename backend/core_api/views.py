from rest_framework import viewsets, permissions
from core.models import ForestCompartment, Appeal, User, Task, LeaseContract
from .serializers import ForestCompartmentSerializer, AppealSerializer, UserSerializer, TaskSerializer, LeaseContractSerializer

class ForestCompartmentViewSet(viewsets.ModelViewSet):
    queryset = ForestCompartment.objects.all()
    serializer_class = ForestCompartmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AppealViewSet(viewsets.ModelViewSet):
    queryset = Appeal.objects.all()
    serializer_class = AppealSerializer
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class LeaseContractViewSet(viewsets.ModelViewSet):
    queryset = LeaseContract.objects.all()
    serializer_class = LeaseContractSerializer
