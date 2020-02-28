import React from 'react';
import styles from './Order.scss';
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


const Order = ({ match, id, className, name, day, money, status }) => {

  if(status==null){

    return(
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
          <div className={cx('button-group')}>

          <ButtonGroup variant="contained"  aria-label="contained primary button group">
            <Link to="/reviewregister/1">
            <CustomButton
                    className={cx('subButton')}
                    type={'button'}
                    value={'리뷰쓰기'}
                    //onClick ={() => {history.push('/reviewregister/1')}}
                />
                </Link>

                <Link to="/laundrylist/1">
                <CustomButton
                    className={cx('subButton')}
                    type={'button'}
                    value={'가게상세'}
                />
                </Link>

                <Link to="/orderdetail/1">
                <CustomButton
                    className={cx('subButton')}
                    type={'button'}
                    value={'주문상세'}
                />
                </Link>

          </ButtonGroup>


          </div>
        </div>
        <Link to={`${match.url}/${id}`}>
          <div className={cx('chat')}>
            <ForumOutlinedIcon style={{ fontSize: 35 }}  />
          </div>
        </Link>
      </div>
    </div >
    )
  }
  else{

  let circle1=null
  let circle2=null
  let circle3=null
  let circle4=null;
  if(status=='waiting'){
    circle1 = <div className={cx('circle1_active')}></div>;
  }else{
    circle1 = <div className={cx('circle1')}></div>;
  }
  if(status=='processing'){
    circle2 = <div className={cx('circle2_active')}></div>;
  }else{
    circle2 = <div className={cx('circle2')}></div>;
  }
  if(status=='delivering'){
    circle3 = <div className={cx('circle3_active')}></div>;
  }else{
    circle3 = <div className={cx('circle3')}></div>;
  }
  if(status=='finished'){
    circle4 = <div className={cx('circle4_active')}></div>;
  }else{
    circle4 = <div className={cx('circle4')}></div>;
  }



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
          <div className={cx('status')}>
          <div className={cx('line')}>
                <div className={cx('line1')}></div>
                {circle1}
                <div className={cx('label1')}>수거중</div>
                {circle2}
                <div className={cx('label2')}>세탁중</div>
                {circle3}
                <div className={cx('label3')}>배달중</div>
                {circle4}
                <div className={cx('label4')}>배달완료</div>
          </div>
          </div>
        </div>
        <Link to={`${match.url}/${id}`}>
          <div className={cx('chat')}>
            <ForumOutlinedIcon style={{ fontSize: 35 }}  />
          </div>
        </Link>
      </div>
    </div >
  )
  }

}

export default Order;