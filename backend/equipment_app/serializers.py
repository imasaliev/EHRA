from rest_framework.serializers import ModelSerializer
from .models import Equipment


class EquipmentSerializer(ModelSerializer):

    class Meta:
        model = Equipment
        fields = ['id', 'location_id', 'name',
                  'buy_price', 'sell_price']
