# Generated by Django 4.0.3 on 2022-10-24 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='serviceappointment',
            name='VIP',
        ),
        migrations.AddField(
            model_name='invvo',
            name='VIP',
            field=models.BooleanField(default=False),
        ),
    ]
