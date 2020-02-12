import React from 'react';
import classNames from 'classnames';
import styles from './SubHeader.scss';
import StarIcon from '@material-ui/icons/Star';

const cx = classNames.bind(styles);

const SubHeader = ({ data }) => {

  const { name, information, grade, minPrice, deliveryTime } = data;

  const GradeIcon = (grade) => {
    const gradeInt = parseInt(grade.grade);
    const list = [];
    for (let i = 0; i < gradeInt; i++) {
      list.push(<StarIcon />);
    }
    return list;
  }

  return (
    <div className={cx('subheader-wapper')}>
      <div className={cx('subheader-content')}>
        <div className={cx('grade-wapper')}>
          <div>{grade}</div>
          <div>
            <GradeIcon grade={grade} />
          </div>
        </div>
        <div className={cx('information-wapper')}>{information}</div>
        <div className={cx('min-price-wapper')}>
          <div className={cx('key')}>최소주문금액</div>
          <div className={cx('value')}>{minPrice}</div>
        </div>
        <div className={cx('delivery-time-wapper')}>
          <div className={cx('key')}>배달시간</div>
          <div className={cx('value')}>{deliveryTime} 소요 예상</div>
        </div>
      </div>
    </div>
  )
}

export default SubHeader;