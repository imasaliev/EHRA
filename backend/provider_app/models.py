from django.db import models

# Create your models here.


class Provider(models.Model):
    name = models.CharField(unique=True)
    current_rate_api = models.CharField()
    last_24_hours_api = models.CharField()
