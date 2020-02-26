from django.contrib.auth import get_user_model
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOnly(BasePermission):
    # 작성자만 접근
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            # 관리자
            if request.user.role == '10':
                return True
            elif hasattr(obj, 'profile'):
                return obj.profile.id == request.user.id
            elif obj.__class__ == get_user_model():
                return obj.id == request.user.id
            return False
        else:
            return False


class IsOwnerOrReadOnly(BasePermission):
    # 작성자만 접근, 작성자가 아니면 Read만 가능
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.user.role == '10':
                return True
            # 값을 바꾸지 않는 안전한 method
            elif request.method in SAFE_METHODS:
                return True
            elif hasattr(obj, 'profile'):
                return obj.profile.id == request.user.id
            elif obj.__class__ == get_user_model():
                return obj.id == request.user.id
            return False
        else:
            return False
