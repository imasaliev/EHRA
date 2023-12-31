# Generated by Django 4.2.4 on 2023-08-13 20:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('provider_app', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('location_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='provider_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='locations', to='provider_app.provider'),
        ),
        migrations.AlterField(
            model_name='location',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='locations', to=settings.AUTH_USER_MODEL),
        ),
    ]
