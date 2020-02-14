import React from 'react';
import styles from './OrderDetail.scss';
import CustomButton from '../Common/CustomButton';
import className from 'classnames/bind';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ChatIcon from '@material-ui/icons/Chat';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const cx = className.bind(styles);


const OrderDetail = ({ match, id, className, name, day, money}) => {

  return (

    <div className={cx('order-container', className)}>
      <div className={cx('order-wapper')}>

        <div className={cx('order-content')}>
          <div className={cx('name')}>{name}</div>
          <div className={cx('Order-rowItem')}>
            <span className={cx('label')}>맡긴 날짜</span>
            <div className={cx('day')}>{day}</div>
          </div>
          <div className={cx('Order-rowItem')}>
             <span className={cx('label')}>금액</span>
             <div className={cx('money')}>{money}</div>
          </div>

        </div>
      </div>
    </div >
  )


}

export default OrderDetail;