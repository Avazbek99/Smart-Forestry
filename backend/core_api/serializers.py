from rest_framework import serializers
from core.models import User, ForestCompartment, TreeStand, Appeal, Task, LeaseContract

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'phone_number')

class TreeStandSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreeStand
        fields = '__all__'

class LeaseContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaseContract
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ForestCompartmentSerializer(serializers.ModelSerializer):
    stands = TreeStandSerializer(many=True, read_only=True)
    contract = LeaseContractSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = ForestCompartment
        fields = ('id', 'name', 'polygon', 'area_ha', 'status', 'status_display', 'soil_type', 'climate_zone', 'ndvi_index', 'stands', 'contract')

class AppealSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    
    class Meta:
        model = Appeal
        fields = ('id', 'user', 'user_details', 'type', 'location', 'photo', 'description', 'is_resolved', 'created_at')
