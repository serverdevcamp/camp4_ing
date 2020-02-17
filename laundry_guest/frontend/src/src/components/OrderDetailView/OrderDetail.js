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


const OrderDetail = ({ id, className, name, value, type, requirement, price}) => {

  return (

    <div className={cx('order-container', className)}>
      <div className={cx('order-wapper')}>

        <div className={cx('order-content')}>
         <div className={cx('Order-rowItem')}>
          <div className={cx('name')}>{name}</div>
          <div className={cx('money')}>{price}원</div>
         </div>
          <div className={cx('Order-rowItem')}>
            <span className={cx('label')}>요청수량:</span>
            <div className={cx('valuelabel')}>{value}개</div>
          </div>
          <div className={cx('Order-rowItem')}>
            <span className={cx('label')}>세탁유형:</span>
            <div className={cx('valuelabel')}>{type}</div>
          </div>
          <div className={cx('Order-rowItem')}>
            <span className={cx('label')}>{requirement}</span>
          </div>

        </div>
      </div>
    </div >
  )


}

export default OrderDetail;