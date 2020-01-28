from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProfileSerializer


class CreateProfileView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        print(request.data, "############")
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            saved_profile = serializer.save()
        else:
            return Response({'response': 'error', 'message': serializer.errors})
        return Response({'response': 'success', 'message': 'user create sucessfully'})


def main(request):
    return render(request, 'myauth/main.html')
