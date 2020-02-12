import React from 'react';
import styles from './Laundry.scss';
import className from 'classnames/bind';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const cx = className.bind(styles);

const Laundry = ({ className, name, content }) => {
  return (
    <div className={cx('laundry-container', className)}>
      <div className={cx('laundry-wapper')}>
        <div className={cx('laundry-image')}>
          <div className={cx('image')}></div>
        </div>
        <div className={cx('laundry-content')}>
          <div className={cx('name')}>{name}</div>
          <div className={cx('content')}>{content}</div>
        </div>
        <div className={cx('more')}>
          <ArrowBackIcon />
        </div>
      </div>
    </div>
  )
}

export default Laundry;