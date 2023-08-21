from rest_framework.serializers import ModelSerializer
from .models import Location
from equipment_app.serializers import EquipmentSerializer
from provider_app.serializers import ProviderOnlySerializer


class LocationSerializer(ModelSerializer):
    equipments = EquipmentSerializer(many=True)
    provider_id = ProviderOnlySerializer()

    class Meta:
        model = Location
        fields = ['id', 'provider_id', 'name',
                  'address', 'active', 'equipments']


class LocationOnlySerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'provider_id', 'name', 'address', 'active']
