import React, {useEffect, useState} from "react";
import className from 'classnames';
import style from '../components/Common/Background.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import OrderTable from "../components/OrderView/OrderTable";
import DetailOrderModal from "../components/OrderView/DetailOrderModal";
import {useSelector} from "react-redux";
import EndPoint from "../config/EndPoint";
import axios from 'axios';

const cx = className.bind(style);

const OrderView = ({}) => {

  const profile = useSelector(state => state.profile);

  const [orders, setOrders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(0);
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [createAt, setCreateAt] = useState(new Date());
  const [orderItems, setOrderItems] = useState([]);

  const getOrders = () => {
    const url = `${EndPoint.logicServer}/order/${profile.shopId}`;
    axios.get(url)
      .then(response => {
        if (response.data.response !== 'success') {
          alert('주문 정보 요청 중에 오류가 발생했습니다.');
          return;
        }
        setOrders(response.data.data);
      })
      .catch(err => {
        alert('서버와 올바른 통신을 할 수 없습니다.');

      })
  };

  const setModalInfo = (status, price, pickUpAddress, deliveryAddress, createAt, orderItems) => {
    setPrice(price);
    setStatus(status);
    setPickUpAddress(pickUpAddress);
    setDeliveryAddress(deliveryAddress);
    setCreateAt(createAt);
    setOrderItems(orderItems);
  };

  const modifyOrderStatus = () => {

  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={cx('defaultBackground')}>
      <DefaultHeader title={"주문관리"}/>
      <DefaultMainBody menuIndex={0}>
        <OrderTable
          orders={orders}
          setModalOpen={setModalOpen}
          setModalInfo={setModalInfo}
        />
      </DefaultMainBody>
      <DetailOrderModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        status = {status}
        price = {price}
        pickUpAddress = {pickUpAddress}
        deliveryAddress = {deliveryAddress}
        createAt = {createAt}
        orderItems = {orderItems}
      />
    </div>
  )

};

export default OrderView;