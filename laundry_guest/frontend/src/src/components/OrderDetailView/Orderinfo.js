import React from 'react';
import classNames from 'classnames';
import styles from './Orderinfo.scss';


const cx = classNames.bind(styles);

const Orderinfo = ({ id, name, item, day, num, money, moneymethod, startaddress, endaddress}) => {
  return (
    <div className={cx('orderinfo-wapper')}>
      <div className={cx('orderinfo-content')}>
        <div className={cx('page-name')}>{name}</div>
        <div className={cx('page-name')}>{item}</div>
        <div className={cx('page-name')}>{day}</div>
        <div className={cx('page-name')}>{num}</div>
        <div className={cx('page-name')}>{money}</div>
        <div className={cx('page-name')}>{moneymethod}</div>
        <div className={cx('page-name')}>{startaddress}</div>
        <div className={cx('page-name')}>{endaddress}</div>


      </div>
    </div>
  )
}

export default Orderinfo;