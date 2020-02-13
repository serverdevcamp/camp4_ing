import React from 'react';
import styles from './OrderItem.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

const OrderItem = ({ category, meterial, count, price, requirement }) => {
  return (
    <div className={cx('order-item-container')}>
      <div className={cx('order-item-wapper')}>
        <div className={cx('category')}>{category}</div>
        <div className={cx('item-wapper')}>
          <div className={cx('item-title')}>개당 가격 :</div>
          <div className={cx('item')}>{price}</div>
        </div>
        <div className={cx('item-wapper')}>
          <div className={cx('item-title')}>요청 수량 :</div>
          <div className={cx('item')}>{count}</div>
        </div>
        <div className={cx('requirement')}>{requirement}</div>

        <div className={cx('item-total-price')}>
          {price * count}원
        </div>
      </div>
    </div>
  )
}

export default OrderItem;