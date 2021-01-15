from django.urls import path

from core import views

urlpatterns = [
    path('temp-api-view/', views.TempApiView.as_view())
]