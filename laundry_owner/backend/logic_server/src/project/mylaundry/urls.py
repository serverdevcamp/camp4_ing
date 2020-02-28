from django.urls import path
from . import views

app_name = 'mylaundry'

urlpatterns = [
    #상품조회 및 등록
    path('item_info/<int:shop_id>', views.ItemInfoView.as_view(), name="item_info"),
    #onoff 처리
    path('toggle/<int:shop_id>', views.OnoffView.as_view(), name="toggle"),
    #가게 상태 조회
    path('shopstatus/<int:shop_id>', views.ShopstatusView.as_view(), name="shopstatus"),
    #상품 수정
    path('item_info/<int:shop_id>/<int:item_id>', views.ItemDetailInfoView.as_view(), name="item_info_change"),
    #리뷰관련
    path('review/<int:shop_id>', views.ReviewView.as_view(), name="review"),
    path('review_uncomment/<int:shop_id>', views.UncommentReviewView.as_view(), name="review"),
    path('review_comment/<int:shop_id>', views.CommentReviewView.as_view(), name="review"),
    path('review/<int:shop_id>/<int:review_id>', views.CommentView.as_view(), name="comment"),
    #통계_매출
    path('statistic/time_daily/money/<int:shop_id>', views.StatisticTime_dailyMoneyView.as_view(), name="StatisticTime_dailyMoney"),
    path('statistic/time_weekly/money/<int:shop_id>', views.StatisticTime_weeklyMoneyView.as_view(), name="StatisticTime_weeklyMoney"),
    path('statistic/time_monthly/money/<int:shop_id>', views.StatisticTime_monthlyMoneyView.as_view(), name="StatisticTime_monthlyMoney"),
    #통계_주문량
    path('statistic/time_monthly/ordervalue/<int:shop_id>/<int:laundryitem_id>', views.StatisticTime_monthlyOrdervalueView.as_view(), name="StatisticTime_monthlyOrder"),
    path('statistic/time_weekly/ordervalue/<int:shop_id>/<int:laundryitem_id>', views.StatisticTime_weeklyOrdervalueView.as_view(), name="StatisticTime_weeklyOrder"),
    path('statistic/time_daily/ordervalue/<int:shop_id>/<int:laundryitem_id>', views.StatisticTime_dailyOrdervalueView.as_view(), name="StatisticTime_dailyOrder")
]
