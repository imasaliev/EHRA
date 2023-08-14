from django.http import HttpResponse
import requests


def Comed_api(request):
    if request.method == 'POST':
        r = requests.post(
            'https://hourlypricing.comed.com/api?type=5minutefeed', params=request.POST)
    else:
        r = requests.get(
            'https://hourlypricing.comed.com/api?type=5minutefeed', params=request.GET)
    print(type(r.json()))
    if r.status_code == 200:
        return HttpResponse(r)
    return HttpResponse('Could not save data')
