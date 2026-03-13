from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/projects/', views.get_projects, name='api_get_projects'),
]