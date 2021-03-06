import React, { useState, useEffect } from 'react';
import styles from '../components/PaymentView/PaymentView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import AddressInput from '../components/PaymentView/AddressInput';
import CustomInput from '../components/Common/Input';
import CustomButton from '../components/Common/CustomButton';
import axios from 'axios';
import EndPoint from "../config/EndPoint";
import { useSelector } from "react-redux";
import queryString from 'query-string';
import { withUserAgent } from 'react-useragent';

const cx = className.bind(styles);

const PaymentView = ({ match, history, ua }) => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupDetailAddress, setpickupDetailAddress] = useState('');
  const [deliveryAddress, setdeliveryAddress] = useState('');
  const [deliveryDetailAddress, setdeliveryDetailAddress] = useState('');
  const [requirement, setRequirement] = useState('');
  const [profileId, setProfileId] = useState(-1);
  const [profileData, setProfileData] = useState({});
  const [laundryId] = useState(match.url.split('/')[match.url.split('/').length - 2]);
  const [deliveryTip] = useState(3000);
  const basket = useSelector(state => state.basket, []);
  const profile = useSelector(state => state.profile, []);

  const getUserId = () => {
    axios.get(`/myauth/get_user_id/${profile.username}`)
      .then(response => {
        if (response.data.response === 'success') {
          setProfileId(response.data.data);
        } else {
          console.error(response.data.message);
        }
      })
      .then(
        axios.get(`/myauth/profile/${profileId}`)
          .then(response => {
            if (response.data.response === 'success') {
              console.log(response.data.data);
              setProfileData(response.data.data);
            } else {
              console.error(response.data.message);
            }
          })
      )
  }

  // const getUserData = () => {
  //   axios.get(`${EndPoint.authServer}/myauth/profile/${profileId}`)
  //     .then(response => {
  //       if (response.data.response === 'success') {
  //         setProfileData(response.data.data);
  //       } else {
  //         console.error(response.data.message);
  //       }
  //     })
  // }


  const orderData = {
    pickup_address: pickupAddress,
    pickup_detail_address: pickupDetailAddress,
    delivery_address: deliveryAddress,
    delivery_detail_address: deliveryDetailAddress,
    requirement: requirement,
    orderItems: basket.basketItems
  }

  const handlePayment = () => {
    onClickPayment();

    // Order 및 OrderItem 생성 로직
    // axios.post(`${EndPoint.paymentServer}/payment/${laundryId}/order/`,
    //   orderData,
    //   { withCredentials: true }
    // )
    //   .then(response => {
    //     if (response.data.response === 'success') {
    //       // TODO: 결제 성공 시 로직
    //       console.log("주문 성공");
    //     }
    //     else {
    //       console.log(response.data.message);
    //       alert('주문 실패');
    //     }
    //   })
  }

  // iamport 

  const onClickPayment = () => {

    const userCode = 'iamport';

    const {
      username,
      email,
      nickname,
      address,
      detail_address,
      phone
    } = profileData;

    const data = {
      pg: 'html5_inicis',                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
      amount: basket.totalPrice + deliveryTip,      // 결제금액
      name: `${username}의 주문`,                     // 주문명
      buyer_name: nickname,                         // 구매자 이름
      buyer_tel: phone,                             // 구매자 전화번호
      buyer_email: email,                           // 구매자 이메일
      buyer_addr: address,                          // 구매자 주소
      buyer_postcode: detail_address,               // 구매자 우편번호
    };

    if (isReactNative()) {
      const params = {
        userCode,
        data,
        type: 'payment',
      };
      const paramsToString = JSON.stringify(params);
      window.ReactNativeWebView.postMessage(paramsToString);
    } else {
      const { IMP } = window;
      IMP.init(userCode);
      IMP.request_pay(data, callback);
    }
  }

  const callback = (response) => {
    console.log(response);

    const query = queryString.stringify(response);
    console.log(query);
    const {
      success,
      merchant_uid,
      error_msg
    } = response;

    if (success) {
      alert('결제 성공');
      history.push(`/laundrylist/${laundryId}/payment/result`);
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  const isReactNative = () => {
    if (ua.mobile) return true;
    return false;
  }


  useEffect(() => {

    getUserId();
    //getUserData();
  }, [profile, profileId]);

  return (
    <div className={cx('payment-page')}>
      <Header
        className={'payment-header'}
        name={'주문정보'}
        history={history}
      />
      <AddressInput
        name={'수거주소'}
        address={pickupAddress}
        setAddress={setPickupAddress}
        detailAddress={pickupDetailAddress}
        setDetailAddress={setpickupDetailAddress}
      />
      <AddressInput
        name={'배달주소'}
        address={deliveryAddress}
        setAddress={setdeliveryAddress}
        detailAddress={deliveryDetailAddress}
        setDetailAddress={setdeliveryDetailAddress}
      />
      <div className={cx('item-wrapper')}>
        <div className={cx('item-name')}>요청사항</div>
        <CustomInput
          className={cx('inputText')}
          type={'text'}
          placeHolder={'ex) 부재 시 경비실에 맡겨주세요.'}
          onChangeEvent={e => setRequirement(e.target.value)}
        />
      </div>
      <div className={cx('item-wrapper')}>
        <div className={cx('item-name')}>결제금액</div>
        <div className={cx('total-price')}>{basket.totalPrice + deliveryTip}원</div>
        <div className={cx('detail-price')}>주문 금액 {basket.totalPrice}원 + 배달팁 {deliveryTip}원</div>
      </div>
      <CustomButton
        type={'button'}
        className={'payment-button'}
        value={'결제하기'}
        isInActive={true}
        onClick={handlePayment}
      />
    </div>
  )
}

export default withUserAgent(PaymentView);