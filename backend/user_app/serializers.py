from rest_framework.serializers import ModelSerializer
from .models import User
from location_app.serializers import LocationOnlySerializer, LocationSerializer


class UserSerializer(ModelSerializer):
    locations = LocationSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'locations']


class UserOnlySerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']
