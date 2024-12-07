from django.db import models

# Create your models here.


class Blog(models.Model):
    field = models.CharField(max_length=2056)
    blogger_name = models.CharField(max_length=200)
    blogger_image = models.CharField(max_length=2083)
    publish_time = models.IntegerField()