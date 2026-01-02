# from django.urls import path
# from detection import views

# urlpatterns = [
#     path('detection/', views.hate_speech_detection, name='hate_speech_detection'),
#     path('test/', views.test_model, name='test_model'),
#     path('feedback/', views.submit_feedback, name='submit_feedback'),
# ]
from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_hate_speech, name='predict'),
]
