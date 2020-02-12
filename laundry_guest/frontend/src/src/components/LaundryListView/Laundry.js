import React from 'react';
import styles from './Laundry.scss';
import className from 'classnames/bind';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Link } from "react-router-dom";

const cx = className.bind(styles);

const Laundry = ({ match, id, className, name, content }) => {

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
        <Link to={`${match.url}/${id}`}>
          <div className={cx('more')}>
            <ArrowForwardIcon />
          </div>
        </Link>
      </div>
    </div >
  )
}

export default Laundry;