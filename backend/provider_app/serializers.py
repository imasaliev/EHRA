from rest_framework.serializers import ModelSerializer
from .models import Provider


class ProviderOnlySerializer(ModelSerializer):
    class Meta:
        model = Provider
        fields = ['id', 'name']
