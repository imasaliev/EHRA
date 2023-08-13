from django.db import models
from location_app.models import Location

# Create your models here.


class Equipment(models.Model):
    location_id = models.ForeignKey(Location, on_delete=models.RESTRICT)
    name = models.CharField(unique=True)
    buy_price = models.DecimalField(
        max_digits=4, decimal_places=2, null=True, blank=True)
    sell_price = models.DecimalField(
        max_digits=4, decimal_places=2, null=True, blank=True)
    active = models.BooleanField(default=True)
