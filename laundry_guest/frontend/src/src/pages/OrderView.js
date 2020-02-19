import React, { useState, useEffect } from 'react';
import styles from '../components/OrderView/OrderView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import OrderItem from '../components/OrderView/OrderItem';
import CustomButton from '../components/Common/CustomButton';
import { useSelector } from "react-redux";

const cx = className.bind(styles);

// const orderItemData = [
//   {
//     id: 1,
//     category: "바지",
//     material: "면",
//     count: 5,
//     price: 2000,
//     requirement: "바지도 조심히 빨아주세요."
//   },
//   {
//     id: 2,
//     category: "셔츠",
//     material: "린넨",
//     count: 4,
//     price: 3000,
//     requirement: "린넨은 구김 펴주세요."
//   },
//   {
//     id: 3,
//     category: "바지",
//     material: "청",
//     count: 1,
//     price: 4000,
//     requirement: "청물 안빠지게 해주세요."
//   },
// ]

const OrderView = ({ history, match, location }) => {
  //const [orderItemComponent, setOrderItemComponent] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  //let totalPrice = 0;
  const { basketItems } = useSelector(state => state.basket, []);
  console.log(basketItems);

  const laundryName = "스마일 세탁소";

  const handlePaymentView = () => {
    const urlItems = match.url.split('/');
    urlItems.pop();
    urlItems.push('payment');
    const url = urlItems.join('/');
    window.location.href = url;
  }

  const orderItemComponent = basketItems.map(({ count, price, ...rest }) => {
    console.log("orderItemComponent");
    //totalPrice += count * price;
    return (
      <OrderItem
        //key={id}
        count={count}
        price={price}
        {...rest}
      />
    )
  })

  useEffect(() => {
    console.log(basketItems);
    basketItems.map(({ price, count }) => {
      console.log(price);
      console.log(totalPrice, price * count);
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
        onClick={handlePaymentView}
        className={'order-button'}
        value={'주문하기'}
        isInActive={true}
      />
    </div>
  )
}

export default OrderView;