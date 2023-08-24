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
from .models import Location
from .serializers import LocationSerializer, LocationOnlySerializer, Location
from provider_app.models import Provider
from user_app.models import User


class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class All_locations(User_permissions):
    def get(self, request):
        # user = get_object_or_404(User, email=request.user.email)
        # locations = get_list_or_404(Location, user_id=request.user.id)
        return Response(
            LocationSerializer(request.user.locations, many=True
                               ).data
        )

    def post(self, request):
        request.data["user_id"] = request.user
        request.data["provider_id"] = get_object_or_404(
            Provider, id=request.data["provider_id"])
        new_location = Location(**request.data)
        new_location.save()
        return Response(LocationSerializer(new_location).data, status=HTTP_201_CREATED)


class A_location(User_permissions):
    def get(self, request, location_id):
        a_location = get_object_or_404(request.user.locations, id=location_id)
        return Response(LocationSerializer(a_location).data)

    def put(self, request, location_id):
        try:
            a_location = get_object_or_404(
                request.user.locations, id=location_id)
            Location.objects.filter(id=a_location.id).update(**request.data)
            return Response(status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)

    def delete(self, request, location_id):
        a_location = get_object_or_404(request.user.locations, id=location_id)
        Location.objects.filter(id=a_location.id).delete()
        return Response(status=HTTP_204_NO_CONTENT)


# Create your views here.
