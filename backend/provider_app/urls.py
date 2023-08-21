from django.urls import path, include
from .views import All_providers, provider_api


urlpatterns = [
    path("", All_providers.as_view()),
    path("<int:provider_id>/<int:id>", provider_api),
]
