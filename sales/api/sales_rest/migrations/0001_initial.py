# Generated by Django 4.0.3 on 2022-10-24 20:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='InventoryVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vinVO', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Salesman',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('employee_number', models.PositiveIntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Automobile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.CharField(max_length=20)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='customer', to='sales_rest.customer')),
                ('salesman', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='salesman', to='sales_rest.salesman')),
                ('vin', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='vin', to='sales_rest.inventoryvo')),
            ],
        ),
    ]
