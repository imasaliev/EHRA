from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    email = models.EmailField(verbose_name='email address',
                              max_length=255,
                              unique=True,)
    USERNAME_FIELD = "email"
    first_name = models.CharField()
    last_name = models.CharField()
    REQUIRED_FIELDS = [first_name, last_name]
