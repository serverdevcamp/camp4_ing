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

  const {userId,shopId} = useSelector(state => state.profile);

  const [orders, setOrders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderId,setOrderId] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(0);
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [createAt, setCreateAt] = useState(new Date());
  const [orderItems, setOrderItems] = useState([]);

  const getOrders = () => {
    console.log(shopId,'haha');
    const url = `${EndPoint.logicServer}/order/${shopId}`;
    axios.get(url)
      .then(response => {
        if (response.data.response !== 'success') {
          alert('주문 정보 요청 중에 오류가 발생했습니다.');
          return;
        }
        setOrders(response.data.data);
        setModalOpen(false);
      })
      .catch(err => {
        alert('서버와 올바른 통신을 할 수 없습니다.');

      })
  };

  const setModalInfo = (orderId,status, price, pickUpAddress, deliveryAddress, createAt, orderItems) => {
    setOrderId(orderId);
    setPrice(price);
    setStatus(status);
    setPickUpAddress(pickUpAddress);
    setDeliveryAddress(deliveryAddress);
    setCreateAt(createAt);
    setOrderItems(orderItems);
  };

  const modifyOrderStatus = (orderId, status) => {
    const url = `${EndPoint.logicServer}/order/${shopId}/${orderId}/`;
    axios.put(url, {
      status
    }).then(response => {
      if (response.data.response !== 'success') {
        alert('주문 상태 수정 중 오류가 발생했습니다.');
        return;
      }
      alert('주문 상태 변경이 성공적으로 이루어졌습니다.');
      getOrders();
    }).catch(err => {
      alert('서버와의 네트워크 연결이 올바르지 않습니다.');
    })
  };

  useEffect(() => {
    setTimeout(getOrders,500);
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
        orderId={orderId}
        status={status}
        price={price}
        pickUpAddress={pickUpAddress}
        deliveryAddress={deliveryAddress}
        createAt={createAt}
        orderItems={orderItems}
        modifyOrderStatus={modifyOrderStatus}
      />
    </div>
  )

};

export default OrderView;