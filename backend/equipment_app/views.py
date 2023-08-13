from django.shortcuts import render, get_list_or_404, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_202_ACCEPTED
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import Equipment, EquipmentSerializer
from user_app.models import User


class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class All_equipment(User_permissions):
    def get(self, request, location_id):
        location = get_object_or_404(request.user.locations, id=location_id)
        # user = get_object_or_404(User, email=request.user.email)
        # locations = get_list_or_404(Location, user_id=request.user.id)
        return Response(
            EquipmentSerializer(location.equipments, many=True
                                ).data
        )

    def post(self, request, location_id):
        location = get_object_or_404(request.user.locations, id=location_id)
        request.data["location_id"] = location
        new_equipment = Equipment(**request.data)
        new_equipment.save()
        return Response(EquipmentSerializer(new_equipment).data, status=HTTP_201_CREATED)


class An_equipment(User_permissions):

    def get(self, request, location_id, equipment_id):
        location = get_object_or_404(request.user.locations, id=location_id)
        an_equipment = get_object_or_404(location.equipments, id=equipment_id)
        return Response(EquipmentSerializer(an_equipment).data)

    def put(self, request, location_id, equipment_id):
        try:
            location = get_object_or_404(
                request.user.locations, id=location_id)
            an_equipment = get_object_or_404(
                location.equipments, id=equipment_id)
            Equipment.objects.filter(id=an_equipment.id).update(**request.data)
            return Response(status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)

    def delete(self, request, location_id, equipment_id):
        location = get_object_or_404(request.user.locations, id=location_id)
        an_equipment = get_object_or_404(location.equipments, id=equipment_id)
        Equipment.objects.filter(id=an_equipment.id).delete()
        return Response(status=HTTP_204_NO_CONTENT)


# Create your views here.
