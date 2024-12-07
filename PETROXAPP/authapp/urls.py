from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),  # Ensure this line exists for logout
    path('csrf/', views.get_csrf_token, name='csrf'),
    path('user-info/', views.get_user_info, name='get_user_info'),  # Ensure this line exists
    path('index.html', views.blog, name="blog"),
]