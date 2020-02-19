from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LaundryShopSerializer, CommentSerializer, LaundryItemSerializer, ParentReviewSerializer, ReviewSerializer
from .models import LaundryShop, LaundryItem, Review
from order.models import Order, OrderItem
from .pagination import PostPageNumberPagination
from django.db.models import Sum, Q
import json



class ItemInfoView(APIView):

    def get_object(self, request, shop_id):
        try:
            return LaundryShop.objects.get(id=shop_id)
        except:
            return Response({
                'response': 'error',
                'message': 'laundry shop/{} 을 찾을 수 없습니다.'.format(shop_id)
            })

    def get(self, request, shop_id, *args, **kwargs):
        laundry_shop = self.get_object(request, shop_id)
        queryset = LaundryItem.objects.filter(laundry_shop=laundry_shop)
        serializer = LaundryItemSerializer(queryset, many=True)
        return Response({
            'response': 'success',
            'message': '상품 조회 요청이 성공하였습니다.',
            'data': serializer.data,
            'status': laundry_shop.status
        })

    def post(self, request, shop_id, *args, **kwargs):
        '''
        상품 등록

        ---
            {
                "item":{
                        "category":"1",
                        "material":"1",
                        "price":1,
                        "information":"11111"
                }
            }

        '''
        data = request.data.get('item')
        if not data:
            return Response({
                'response': 'error',
                'message': 'profile 파라미터가 없습니다.'
            })
        FK = dict()
        FK['laundry_id'] = shop_id
        print(FK)
        serializer = LaundryItemSerializer(data=data)

        if serializer.is_valid():
            profile = serializer.save(FK=FK)
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })
        return Response({
            'response': 'success',
            'message': '제품이 성공적으로 생성되었습니다.'
        })


class OnoffView(APIView):

    def put(self, request, shop_id, *args, **kwargs):
        '''
        on/off toggle

        ---
        #인자 없이 전달
        '''
        laundryshop = LaundryShop.objects.get(id=shop_id)
        if laundryshop.status =="0":
            laundryshop.status = "1"
            laundryshop.save()
            return Response({
                'response': 'success',
                'message': '상태 변화가 성공했습니다.11',
                'data': laundryshop.status
            })
        elif laundryshop.status =="1":
            laundryshop.status = "0"
            laundryshop.save()
            return Response({
                'response': 'success',
                'message': '상태 변화가 성공했습니다.22',
                'data': laundryshop.status
            })
        else:
            return Response({
                'response': 'error',
                'message': '상태변화 실패'
            })


class ItemDetailInfoView(APIView):

    def get_object(self, request, item_id):
        try:
            return LaundryItem.objects.get(id=item_id)
        except:
            return Response({
                'response': 'error',
                'message': 'laundry item/{} 을 찾을 수 없습니다.'.format(item_id)
            })

    def get(self, request, shop_id, item_id, *args, **kwargs):
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        queryset = LaundryItem.objects.filter(laundry_shop=laundry_shop)
        laundry_item= self.get_object(request, item_id)
        if laundry_item is None:
            return Response({
                'response': 'error',
                'message': '{} item을 찾을 수 없습니다.'.format(item_id)
            })
        shop_serializer = LaundryItemSerializer(queryset, many=True)
        item_serializer = LaundryItemSerializer(laundry_item)

        return Response({
            'response': 'success',
            'message': '상품 상세 조회 요청이 성공하였습니다.',
            'status': laundry_shop.status,
            'item_data': item_serializer.data,
            'shop_data': shop_serializer.data
        })

    def put(self, request, shop_id,item_id):
        '''
        상품수정

        ---
            {
                "item":{
                        "price":"1111",
                        "material":"222"
                }
            }
        '''
        item = self.get_object(request, item_id)
        if item is None:
            return Response({
                'response': 'error',
                'message': '{} item를 찾을 수 없습니다.'.format(item_id)
            })

        serializer = LaundryItemSerializer(
            item, data=request.data.get('item'), partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'response': 'success',
                'message': 'item이 성공적으로 수정되었습니다.',
                'data': serializer.data
            })
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })

    def delete(self, request, shop_id, item_id):
        item = self.get_object(request, item_id)
        if item is None:
            return Response({
                'response': 'error',
                'message': '{} item을 찾을 수 없습니다.'.format(item_id)
            })
        try:
            item.delete()
        except:
            return Response({
                'response': 'error',
                'message': 'db에서 삭제에 실패했습니다.'
            })

        return Response({
            'response': 'success',
            'message': 'review가 성공적으로 삭제되었습니다.'
        })

class ReviewView(APIView):
    def get(self, request, shop_id, *args, **kwargs):
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        queryset = Review.objects.filter(laundryshop=laundry_shop, parent__isnull=True).order_by('created_at').reverse()
        pagination_class = PostPageNumberPagination
        paginator = pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        serializer = ParentReviewSerializer(page, many=True)
        return Response({
            'response': 'success',
            'data':{
            'links': {
                'next':paginator.get_next_link(),
                'previous': paginator.get_previous_link()
            },
            'count': paginator.page.paginator.count,
            'results': serializer.data
            }
        })



class UncommentReviewView(APIView):
    def get(self, request, shop_id, *args, **kwargs):
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        queryset = Review.objects.filter(laundryshop=laundry_shop, parent__isnull=True, comment__isnull=True).order_by('created_at').reverse()
        pagination_class = PostPageNumberPagination
        paginator = pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        serializer = ParentReviewSerializer(page, many=True)
        return Response({
            'response': 'success',
            'data':{
            'links': {
                'next':paginator.get_next_link(),
                'previous': paginator.get_previous_link()
            },
            'count': paginator.page.paginator.count,
            'results': serializer.data
            }
        })

class CommentReviewView(APIView):
    def get(self, request, shop_id, *args, **kwargs):
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        queryset = Review.objects.filter(laundryshop=laundry_shop, parent__isnull=True, comment__isnull=False).order_by(
            'created_at').reverse()
        pagination_class = PostPageNumberPagination
        paginator = pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        serializer = ParentReviewSerializer(page, many=True)
        return Response({
            'response': 'success',
            'data':{
            'links': {
                'next':paginator.get_next_link(),
                'previous': paginator.get_previous_link()
            },
            'count': paginator.page.paginator.count,
            'results': serializer.data
            }
        })

class CommentView(APIView):
    def post(self, request, shop_id, review_id, *args, **kwargs):
        '''
        대댓글 생성

        ---
            {
                "comment":{
                            "content":"11111111111"
                }
            }
        '''
        try:
            data = request.data['comment']
        except:
            return Response({
                'response': 'error',
                'message': 'review 파라미터가 없습니다.'
            })
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        parent = Review.objects.get(id=review_id)
        profile = laundry_shop.profile
        #print(parent)
        FK = dict()
        FK['profile_id'] = profile.id
        FK['laundry_id'] = shop_id
        FK['parent_id'] = parent.id

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            review = serializer.save(FK=FK)
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })
        return Response({
            'response': 'success',
            'message': 'comment 가 성공적으로 생성되었습니다.'
        })

    def put(self, request, shop_id, review_id):
        '''
        대댓글 수정

        ---
            {
                "comment":{
                                "content":"11111111111"
                }
            }
        '''
        review = Review.objects.get(id=review_id)
        if review is None:
            return Response({
                'response': 'error',
                'message': '{} review를 찾을 수 없습니다.'.format(review_id)
            })
        serializer = CommentSerializer(review, data=request.data['comment'], partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'response': 'success',
                'message': 'review가 성공적으로 수정되었습니다.',
                'data': serializer.data
            })
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })

    def delete(self, request, shop_id, review_id):
        review = Review.objects.get(id=review_id)
        if review is None:
            return Response({
                'response': 'error',
                'message': '{} review를 찾을 수 없습니다.'.format(id)
            })
        try:
            review.delete()
        except:
            return Response({
                'response': 'error',
                'message': 'db에서 삭제에 실패했습니다.'
            })

        return Response({
            'response': 'succes',
            'message': 'review가 성공적으로 삭제되었습니다.'
        })


class StatisticTime_dailyMoneyView(APIView):

    def get(self, request, shop_id, *args, **kwargs):
        laundryshop = LaundryShop.objects.get(id=shop_id)
        order=Order.objects.filter(laundry_shop=laundryshop).exclude(Q(status='cancelled')&Q(status='failed')&Q(status='ready')).extra({'order': "date(created_at)"}).values('order').annotate(daily_total=Sum('total_price')).order_by('-order')[:30]
        print(order)
        return Response({
            'response': 'success',
            'data':order
        })


class StatisticTime_weeklyMoneyView(APIView):

    def get(self, request, shop_id, *args, **kwargs):
        laundryshop = LaundryShop.objects.get(id=shop_id)
        order=Order.objects.filter(laundry_shop=laundryshop).exclude(Q(status='cancelled')&Q(status='failed')&Q(status='ready')).extra({'order' :"concat(year(created_at), '년', month(created_at), '월', weekofyear(created_at) - week(concat(year(created_at),'-',month(created_at),'-01'),1) +1, '주차' )"}).values('order').annotate(weekly_total=Sum('total_price')).order_by('-order')[:15]
        print(order)
        return Response({
            'response': 'success',
            'data':order
        })



class StatisticTime_monthlyMoneyView(APIView):

    def get(self, request, shop_id, *args, **kwargs):
        laundryshop = LaundryShop.objects.get(id=shop_id)
        order=Order.objects.filter(laundry_shop=laundryshop).exclude(Q(status='cancelled')&Q(status='failed')&Q(status='ready')).extra({'month': "month(created_at)"}).values('month').annotate(monthly_total=Sum('total_price')).order_by('-month')[:12]
        print(order)
        return Response({
            'response': 'success',
            'data':order
        })



class StatisticTime_dailyOrdervalueView(APIView):

    def get(self, request,  shop_id, laundryitem_id, *args, **kwargs):
        laundryitem = LaundryItem.objects.get(id=laundryitem_id)
        laundryshop = LaundryShop.objects.get(id=shop_id)
        ordervalue = OrderItem.objects.filter(laundry_item=laundryitem).extra({'ordervalue': "SELECT date(created_at) FROM Order_Order WHERE id= Order_OrderItem.order_id"}).values('ordervalue').annotate(daily_total=Sum('quantity')).order_by('-ordervalue')[:30]
        print(ordervalue)
        return Response({
            'response': 'success',
            'data':ordervalue
        })


class StatisticTime_weeklyOrdervalueView(APIView):

    def get(self, request, shop_id, laundryitem_id, *args, **kwargs):
        laundryitem = LaundryItem.objects.get(id=laundryitem_id)
        laundryshop = LaundryShop.objects.get(id=shop_id)
        ordervalue=OrderItem.objects.filter(laundry_item=laundryitem).extra({'order' :"SELECT concat(year(created_at), '년', month(created_at), '월', weekofyear(created_at) - week(concat(year(created_at),'-',month(created_at),'-01'),1) +1, '주차' ) FROM Order_Order WHERE id= Order_OrderItem.order_id"}).values('order').annotate(weekly_total=Sum('quantity')).order_by('-order')[:15]
        print(ordervalue)
        return Response({
            'response': 'success',
            'data':ordervalue
        })



class StatisticTime_monthlyOrdervalueView(APIView):

    def get(self, request, shop_id, laundryitem_id, *args, **kwargs):
        laundryitem = LaundryItem.objects.get(id=laundryitem_id)
        laundryshop = LaundryShop.objects.get(id=shop_id)
        order=OrderItem.objects.filter(laundry_item=laundryitem).extra({'month': "SELECT month(created_at)FROM Order_Order WHERE id= Order_OrderItem.order_id"}).values('month').annotate(monthly_total=Sum('quantity')).order_by('-month')[:12]
        print(order)
        return Response({
            'response': 'success',
            'data':order
        })
