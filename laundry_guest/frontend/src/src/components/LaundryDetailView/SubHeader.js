import React from 'react';
import classNames from 'classnames';
import styles from './SubHeader.scss';
import GradeIcon from '../Common/GradeIcon'

const cx = classNames.bind(styles);

const SubHeader = ({ laundryDetail }) => {

  const { name, information, grade, min_price, delivery_dt } = laundryDetail;

  return (
    <div className={cx('subheader-wrapper')}>
      <div className={cx('subheader-content')}>
        <div className={cx('grade-wrapper')}>
          <div>{grade}</div>
          <div>
            <GradeIcon grade={grade} fontSize={'2rem'} />
          </div>
        </div>
        <div className={cx('information-wrapper')}>{information}</div>
        <div className={cx('min-price-wrapper')}>
          <div className={cx('key')}>최소주문금액</div>
          <div className={cx('value')}>{min_price}</div>
        </div>
        <div className={cx('delivery-time-wrapper')}>
          <div className={cx('key')}>배달시간</div>
          <div className={cx('value')}>{delivery_dt} 소요 예상</div>
        </div>
      </div>
    </div>
  )
}

export default SubHeader;