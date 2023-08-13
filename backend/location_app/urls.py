from django.urls import path, include
from .views import All_locations, A_location


urlpatterns = [
    path("", All_locations.as_view()),
    path("<int:location_id>/", A_location.as_view()),
    path("<int:location_id>/equipments/", include("equipment_app.urls")),
    # path("logout/", Log_out.as_view()),
    # path("login/", Log_in.as_view()),
]
