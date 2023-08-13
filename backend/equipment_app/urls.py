from django.urls import path, include
from .views import All_equipment, An_equipment


urlpatterns = [
    path("", All_equipment.as_view()),
    path("<int:equipment_id>/", An_equipment.as_view()),
    # path("<int:id>/equipment", include("equipment_app.urls")),
    # path("logout/", Log_out.as_view()),
    # path("login/", Log_in.as_view()),
]
