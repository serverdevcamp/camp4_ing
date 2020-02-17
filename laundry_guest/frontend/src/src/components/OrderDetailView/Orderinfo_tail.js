import React from 'react';
import classNames from 'classnames';
import styles from './Orderinfo_tail.scss';


const cx = classNames.bind(styles);

const Orderinfo = ({ money, moneymethod, startaddress, endaddress}) => {
  return (
    <div className={cx('orderinfo-wapper')}>
      <div className={cx('orderinfo-content')}>
       <div className={cx('Order-rowItem')}>
        <div className={cx('name')}>총 결제 금액</div>
         <div className={cx('price')}>{money}</div>
        </div>
        <div className={cx('Order-rowItem')}>
        <div className={cx('name')}>결제방법</div>
         <div className={cx('price')}>{moneymethod}</div>
        </div>
        <div className={cx('page-name')}>
        <div className={cx('page-name')}>수거주소 : {startaddress}</div>
        <div className={cx('page-name')}>배달주소 : {endaddress}</div>
        </div>


      </div>
    </div>
  )
}

export default Orderinfo;