from rest_framework.serializers import ModelSerializer
from .models import Provider
from location_app.serializers import LocationOnlySerializer


class ProviderSerializer(ModelSerializer):
    locations = LocationOnlySerializer(many=True)

    class Meta:
        model = Provider
        fields = ['id', 'name', 'current_rate_api',
                  'last_24_hours_api', 'locations']


class ProviderOnlySerializer(ModelSerializer):
    class Meta:
        model = Provider
        fields = ['id', 'name', 'current_rate_api', 'last_24_hours_api']
