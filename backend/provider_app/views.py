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
from .serializers import Provider, ProviderOnlySerializer
from django.http import HttpResponse
import requests


class All_providers(APIView):
    def get(self, request):
        providers = Provider.objects.all()
        print(ProviderOnlySerializer(providers, many=True))
        return Response(ProviderOnlySerializer(providers, many=True).data)


def provider_api(request, provider_id, id=None):
    provider = get_object_or_404(Provider, id=provider_id)
    if id not in [None, 0, 24]:
        return HttpResponse('nodata')
    if id in [0, None]:
        return HttpResponse(requests.get(provider.current_rate_api))
    if id == 24:
        return HttpResponse(requests.get(provider.last_24_hours_api))


# Create your views here.
