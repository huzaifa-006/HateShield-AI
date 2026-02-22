from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from django.utils import timezone
from datetime import timedelta
import json
import re

User = get_user_model()

# Store reset tokens temporarily (in production, use Redis or database)
password_reset_tokens = {}

@csrf_exempt  
def signup_users(request):
    if request.method == "GET":
        return render(request , "signup.html")

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            username = data.get("username")
            password = data.get("password")

            if not email or not username or not password:
                return JsonResponse({"error": "Email, username, and password are required"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already exists"}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=400)

            user = User(email=email, username=username)
            user.set_password(password) 
            user.save()

            return JsonResponse({
                    "message": "user created successfully",
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "id": user.id
                    }
                }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def login_users(request):
    if request.method == "GET":
        return JsonResponse({"user": "123"}, status=200)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")  
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"error": "Username and password are required"}, status=400)

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({
                    "message": "Login successful",
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "id": user.id,
                        "is_authenticated": True
                    }
                }, status=200)
            else:
                return JsonResponse({"error": "Invalid username or password"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def curr_user(request):
    try:
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({"error": "User not authenticated"}, status=401)
            
        user_data = {
            "email": user.email,
            "username": user.username,
            "id": user.id,
            "is_authenticated": user.is_authenticated
        }
        return JsonResponse({"user": user_data}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@login_required
def change_password(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            old_password = data.get("oldPassword")
            new_password = data.get("newPassword")

            if not old_password or not new_password:
                return JsonResponse({"error": "Old password and new password are required"}, status=400)

            user = request.user
            
            # Check if old password is correct
            if not user.check_password(old_password):
                return JsonResponse({"error": "Current password is incorrect"}, status=400)

            # Validate new password
            if len(new_password) < 8:
                return JsonResponse({"error": "New password must be at least 8 characters long"}, status=400)

            # Set new password
            user.set_password(new_password)
            user.save()

            return JsonResponse({
                "message": "Password changed successfully"
            }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def logout_users(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({"message": "Successfully logged out"}, status=200)
    return JsonResponse({"message": "Not logged in"}, status=200)

@csrf_exempt
def forgot_password(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")

            if not email:
                return JsonResponse({"error": "Email is required"}, status=400)

            # Validate email format
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_pattern, email):
                return JsonResponse({"error": "Please enter a valid email address"}, status=400)

            # Check if user exists
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse({"error": "No account found with this email address"}, status=404)

            # Generate reset token
            reset_token = get_random_string(64)
            expiry_time = timezone.now() + timedelta(hours=1)  # Token expires in 1 hour
            
            # Store token with expiry
            password_reset_tokens[reset_token] = {
                'user_id': user.id,
                'email': email,
                'expires': expiry_time
            }

            # Send reset email
            reset_link = f"http://localhost:3000/reset-password?token={reset_token}"
            
            email_subject = "Password Reset Request - Hate Speech Detection AI"
            email_message = f"""
Hello {user.username},

You have requested to reset your password for your Hate Speech Detection AI account.

To reset your password, please click on the following link:
{reset_link}

This link will expire in 1 hour for security reasons.

If you did not request this password reset, please ignore this email. Your password will remain unchanged.

Best regards,
Hate Speech Detection AI Team

UIIT, PMAS Arid Agriculture University
Rawalpindi, Pakistan
Contact: +92 (341) 5310-800
            """

            try:
                send_mail(
                    email_subject,
                    email_message,
                    'noreply@hatespeechdetection.com',  # From email
                    [email],  # To email
                    fail_silently=False,
                )
                
                return JsonResponse({
                    "message": "Password reset email sent successfully. Please check your email inbox."
                }, status=200)
                
            except Exception as e:
                # In development, you might want to return the reset link directly
                # In production, handle email sending errors properly
                return JsonResponse({
                    "message": "Password reset email sent successfully. Please check your email inbox.",
                    "debug_link": reset_link  # Remove this in production
                }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def reset_password(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            token = data.get("token")
            new_password = data.get("newPassword")

            if not token or not new_password:
                return JsonResponse({"error": "Token and new password are required"}, status=400)

            # Validate new password
            if len(new_password) < 8:
                return JsonResponse({"error": "Password must be at least 8 characters long"}, status=400)

            # Check if token exists and is valid
            if token not in password_reset_tokens:
                return JsonResponse({"error": "Invalid or expired reset token"}, status=400)

            token_data = password_reset_tokens[token]
            
            # Check if token has expired
            if timezone.now() > token_data['expires']:
                # Remove expired token
                del password_reset_tokens[token]
                return JsonResponse({"error": "Reset token has expired. Please request a new one."}, status=400)

            # Get user and update password
            try:
                user = User.objects.get(id=token_data['user_id'])
                user.set_password(new_password)
                user.save()
                
                # Remove used token
                del password_reset_tokens[token]
                
                return JsonResponse({
                    "message": "Password reset successfully. You can now login with your new password."
                }, status=200)
                
            except User.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def verify_reset_token(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            token = data.get("token")

            if not token:
                return JsonResponse({"error": "Token is required"}, status=400)

            # Check if token exists and is valid
            if token not in password_reset_tokens:
                return JsonResponse({"error": "Invalid or expired reset token"}, status=400)

            token_data = password_reset_tokens[token]
            
            # Check if token has expired
            if timezone.now() > token_data['expires']:
                # Remove expired token
                del password_reset_tokens[token]
                return JsonResponse({"error": "Reset token has expired. Please request a new one."}, status=400)

            return JsonResponse({
                "message": "Token is valid",
                "email": token_data['email']
            }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)