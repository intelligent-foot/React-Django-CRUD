from django.urls import path
from . import views


urlpatterns = [
    path('', views.endpoints),
    path('items/', views.item_list, name='items'),
    path('items/<int:pk>/', views.item_detail),

]
#http://127.0.0.1:8000/items/
#http://127.0.0.1:8000/items/id
