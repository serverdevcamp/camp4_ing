import React from 'react';
import styles from '../components/OrderListView/OrderListView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import Menu from '../components/Common/Menu';
import Laundry from '../components/OrderListView/Order';
import { Link } from "react-router-dom";


const cx = className.bind(styles);

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

class OrderListView extends React.Component {


  render() {
    const { match } = this.props;

    const leftComponent = unfinishedData.map(({ id, name, day, money,status }) => {
      return (
        <Laundry
          className={cx('order-item')}
          key={id}
          id={id}
          name={name}
          day={day}
          money={money}
          status={status}
          match={match}
        />
      )
    })


    const rightComponent = finishedData.map(({ id, name, day, money}) => {
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
        <Header name={"주문 내역"} handle={handleMain} />
        <Menu
          leftLabel={'진행중인 세탁'}
          rightLabel={'완료된 세탁'}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        >
        </Menu>
      </div>
    )
  }
}

export default OrderListView;