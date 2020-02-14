from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
#from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myauth/', include('myauth.urls')),
    path('laundry/', include('laundry.urls')),
    path('payment/', include('payment.urls')),
    # path('jwt/get/', obtain_jwt_token),
    # path('jwt/verify/', verify_jwt_token),
    # path('jwt/refresh/', refresh_jwt_token),
    path('api-auth/', include('rest_framework.urls')),
]

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    validators=['flex'],
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns += [
    url(r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger',
                                           cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc',
                                         cache_timeout=0), name='schema-redoc'),
]
