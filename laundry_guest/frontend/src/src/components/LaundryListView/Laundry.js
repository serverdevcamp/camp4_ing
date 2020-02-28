import React from 'react';
import styles from './Laundry.scss';
import className from 'classnames/bind';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from "react-router-dom";

const cx = className.bind(styles);

const Laundry = ({ match, id, className, name, content, grade, likeNum, laundryShopImg }) => {

  return (
    <div className={cx('laundry-container', className)}>
      <div className={cx('laundry-wrapper')}>
        <div className={cx('laundry-image')}>
          {/* <div className={cx('image')}></div> */}
          <img className={cx('image')} src={laundryShopImg} />
        </div>
        <div className={cx('laundry-content')}>
          <div className={cx('name')}>{name}</div>
          <div className={cx('laundry-sub-content')}>
            <StarIcon style={{ fontSize: '12px' }} />
            <div className={cx('grade')}>{grade}</div>
            <FavoriteIcon style={{ fontSize: '12px' }} />
            <div className={cx('likeNum')}>{likeNum}</div>
          </div>
          <div className={cx('content')}>{content}</div>
        </div>
        <Link to={`${match.url}/${id}`} className={cx('more')}>
          <ArrowForwardIcon />

        </Link>
      </div>
    </div >
  )
}

export default Laundry;