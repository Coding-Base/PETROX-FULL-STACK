from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse,HttpResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Blog
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('user')
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        first_name = data.get('f_name')
        last_name = data.get('l_name')
        email = data.get('email')

        # Basic validation
        if password != confirm_password:
            return JsonResponse({'success': False, 'error': 'Passwords do not match'})

        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'error': 'Username already exists'})

        # Creating the user
        user = User.objects.create_user(
            username=username, 
            password=password, 
            first_name=first_name, 
            last_name=last_name, 
            email=email
        )

        return JsonResponse({'success': True, 'message': 'User created successfully'})
    return JsonResponse({'success': False, 'error': 'Invalid request'}, status=400)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            response = JsonResponse({'success': True, 'message': 'Login successful'})
            response.set_cookie('sessionid', request.session.session_key, httponly=True, path='/')
            return response
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'})
    return JsonResponse({'success': False, 'error': 'Invalid request'}, status=400)

def get_csrf_token(request):
    # Endpoint to provide CSRF token for AJAX requests
    return JsonResponse({'csrfToken': get_token(request)})

@login_required
def get_user_info(request):
    user = request.user
    if user.is_authenticated:
        data = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "User not authenticated"}, status=401)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        response = JsonResponse({"success": True, "message": "Logged out successfully"})
        response.delete_cookie('sessionid', path='/')
        return response
    return JsonResponse({"success": False, "error": "Invalid request"}, status=400)

def blog(request):
    blog = Blog.objects.all()
    return render(request, 'templates/index.html', {'blog':blog})

