from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
import logging


# Create your views here.

@api_view(['GET'])
def endpoints(request):
    data = ['/items']
    return Response(data)
    

logger = logging.getLogger(__name__)
@api_view(['GET', 'POST'])
def item_list(request):
    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        try:
            title = request.data['title']
            description = request.data['description']

            logger.info(f"Received POST request with title: {title}, description: {description}")

            # Check if title and description are not empty
            if not title or not description:
                return Response({"message": "Title and description are required"}, status=status.HTTP_400_BAD_REQUEST)

            # Create the item
            item = Item.objects.create(
                title=title,
                description=description,
            )

            serializer = ItemSerializer(item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except KeyError as e:
            logger.error(f"Invalid request data - missing key: {e}")
            return Response({"message": f"Invalid request data - missing key: {e}"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "GET request processed without any specific action"})


 
@api_view(['GET', 'PUT', 'DELETE'])   
def item_detail(request, pk):
    item = get_object_or_404(Item, pk=pk)
    
    if request.method == 'GET':
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        item.delete()
        return Response({"message": "Item deleted successfully"})

