from django.contrib import admin
from django.urls import path ,include
from . import views

urlpatterns = [
    path('', views.curr_user, name='curr_user'),
    path('signup/', views.signup_users, name='signup'),
    path('login/', views.login_users, name='login'),
    path('logout/', views.logout_users, name='logout'),
    path('change-password/', views.change_password, name='change_password'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('verify-reset-token/', views.verify_reset_token, name='verify_reset_token'),
]

