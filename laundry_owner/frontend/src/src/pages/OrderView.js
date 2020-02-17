import React from "react";
import className from 'classnames';
import style from '../components/Common/Background.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import OrderTable from "../components/OrderView/OrderTable";

const cx = className.bind(style);

const OrderView = ({}) => {


  return (
    <div className={cx('defaultBackground')}>
      <DefaultHeader title={"주문관리"}/>
      <DefaultMainBody menuIndex={0}>
        <OrderTable/>
      </DefaultMainBody>
    </div>
  )

};

export default OrderView;