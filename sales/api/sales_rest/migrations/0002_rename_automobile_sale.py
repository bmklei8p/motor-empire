# Generated by Django 4.0.3 on 2022-10-25 23:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Automobile',
            new_name='Sale',
        ),
    ]
