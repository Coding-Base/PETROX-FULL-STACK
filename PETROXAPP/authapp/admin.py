from django.contrib import admin
from . models import Blog
# Register your models here.
class BlogAdmin(admin.ModelAdmin):
    list_display=('field','blogger_name','blogger_image')



admin.site.register(Blog,BlogAdmin)