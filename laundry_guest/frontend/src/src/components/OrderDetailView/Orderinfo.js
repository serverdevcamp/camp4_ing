import React from 'react';
import classNames from 'classnames';
import styles from './Orderinfo.scss';


const cx = classNames.bind(styles);

const Orderinfo = ({ id, name, item, day, num}) => {
  return (
    <div className={cx('orderinfo-wapper')}>
      <div className={cx('orderinfo-content')}>
      <div className={cx('endtalk')}>배달이 완료되었어요</div>
        <div className={cx('name')}>{name}</div>
        <div className={cx('page-name')}>{item}</div>
        <div className={cx('page-name')}>
        <div className={cx('page-name')}>주문일시 : {day}</div>
        <div className={cx('page-name')}>주문 번호 : {num}</div>
        </div>


      </div>
    </div>
  )
}

export default Orderinfo;