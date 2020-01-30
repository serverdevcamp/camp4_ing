from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LaundryShopSerializer
from .models import LaundryShop


class LaundryShopView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            queryset = LaundryShop.objects.all()
        except:
            # TODO: 여기서 부터 다시 합시다!
            pass
        serializer = LaundryShopSerializer(queryset, many=True)
        return Response(serializer.data)


class LaundryShopDetailView(APIView):

    def get_object(self, id):
        queryset = LaundryShop.objects.get(id=id)

    def get(self, request, id, *args, **kwargs):
        pass
