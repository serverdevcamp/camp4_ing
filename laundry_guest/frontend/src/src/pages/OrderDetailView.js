import React from 'react';
import styles from '../components/OrderDetailView/OrderDetailView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import Menu from '../components/OrderDetailView/ItemSort';
import Orderinfo from'../components/OrderDetailView/Orderinfo'
import Laundry from '../components/OrderDetailView/OrderDetail';
import { Link } from "react-router-dom";


const cx = className.bind(styles);


const orderDetail =
    {
        id:1,
        name: '크린토피아 판교점',
        item: '와이샤스 외 1개',
        day: '2020년 1월 6일 오후 3:59',
        num: 'B0KG07MAHEG',
        money:'170,000원',
        moneymethod:'신용/체크카드',
        startaddress:'경기도 성남시 판교동271-6',
        endaddress:'경기도 성남시 판교동271-6',
    };

const unfinishedData = [
  {
    id: 1,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원',
    status: 'waiting'
  },
  {
    id: 2,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원',
    status: 'processing'
  },
  {
    id: 3,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원',
    status: 'delivering'
  },
  {
    id: 4,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원',
    status: 'finished'
  },

];

const finishedData = [
 {
    id: 1,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원',
  },
   {
    id: 2,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원',
  },
   {
    id: 3,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원',
  },
];

class OrderDetailView extends React.Component {


  render() {
    const { match } = this.props;

    const orderinfoComponent = orderDetail

    const leftComponent = unfinishedData.map(({ id, name, day, money}) => {
      return (
        <Laundry
          className={cx('order-item')}
          key={id}
          id={id}
          name={name}
          day={day}
          money={money}
          match={match}
        />
      )
    })




    const handleMain = () => {
      window.location.href = '/';
    }

    return (
      <div className={cx('order-list-page')} >
        <Header name={"주문 상세"} handle={handleMain} />
        <Orderinfo
        id= {orderinfoComponent.id}
        name= {orderinfoComponent.name}
        item= {orderinfoComponent.item}
        day= {orderinfoComponent.day}
        num= {orderinfoComponent.num}
        money= {orderinfoComponent.money}
        moneymethod= {orderinfoComponent.moneymethod}
        startaddress= {orderinfoComponent.startaddress}
        endaddress= {orderinfoComponent.endaddress}
        />
        <Menu
          leftComponent={leftComponent}
        >
        </Menu>
      </div>
    )
  }
}

export default OrderDetailView;