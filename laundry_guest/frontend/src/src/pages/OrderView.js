import React, { useState, useEffect } from 'react';
import styles from '../components/OrderView/OrderView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import OrderItem from '../components/OrderView/OrderItem';
import CustomButton from '../components/Common/CustomButton';
import { useSelector, useDispatch } from "react-redux";
import { setTotalPriceRedux } from "../modules/basket";

const cx = className.bind(styles);

const OrderView = ({ history, match, location }) => {
  const { name: laundryName } = location;
  const [totalPrice, setTotalPrice] = useState(0);
  const { basketItems } = useSelector(state => state.basket, []);


  const dispatch = useDispatch();

  const setTotalPriceInBasket = (totalPrice) => {
    dispatch(setTotalPriceRedux(totalPrice));
  }

  const handlePaymentView = () => {
    const urlItems = match.url.split('/');
    urlItems.pop();
    urlItems.push('payment');
    const url = urlItems.join('/');
    window.location.href = url;
  }

  const orderItemComponent = basketItems.map(({ count, price, ...rest }) => {
    return (
      <OrderItem
        //key={id}
        count={count}
        price={price}
        {...rest}
      />
    )
  })

  const ClickOrderButton = (totalPrice) => {
    setTotalPriceInBasket(totalPrice);
    handlePaymentView();
  }

  useEffect(() => {
    basketItems.map(({ price, count }) => {
      setTotalPrice(prev => prev + price * count);
    })
  }, [basketItems]);

  return (
    <div className={cx('order-page')} >
      <Header
        name={'장바구니'}
        history={history}
      />
      <div className={cx('laundry-name-wrapper')}>
        {laundryName}
      </div>
      <div className={cx('order-item-wrapper')}>{orderItemComponent}</div>
      <div className={cx('total-price-wrapper')}>
        <div>주문금액</div>
        <div>{totalPrice}원</div>
      </div>
      <div className={cx('sub-message')}>
        LaundryRunner는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 LaundryRunner는 상품, 거래 정보 및 거래에 책임을 지지 않습니다.
        </div>
      <CustomButton
        type={'button'}
        onClick={() => ClickOrderButton(totalPrice)}
        className={'order-button'}
        value={'주문하기'}
        isInActive={true}
      />
    </div>
  )
}

export default OrderView;