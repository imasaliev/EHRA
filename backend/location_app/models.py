from django.db import models
from user_app.models import User
from provider_app.models import Provider

# Create your models here.


class Location(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.RESTRICT, related_name="locations")
    provider_id = models.ForeignKey(
        Provider, on_delete=models.RESTRICT, related_name="locations")
    name = models.CharField(unique=True)
    address = models.CharField(blank=True, null=True)
    active = models.BooleanField(default=True)
