# Generated by Django 3.0.2 on 2020-01-30 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laundry', '0002_auto_20200130_0611'),
    ]

    operations = [
        migrations.AlterField(
            model_name='laundryshop',
            name='delivery_dt',
            field=models.CharField(max_length=20),
        ),
    ]