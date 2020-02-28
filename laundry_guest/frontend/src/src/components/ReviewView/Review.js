import React from 'react';
import styles from './Review.scss';
import CustomButton from '../Common/CustomButton';
import className from 'classnames/bind';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ChatIcon from '@material-ui/icons/Chat';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import reviewimage from '../imagefile/unnamed.jpg'

const cx = className.bind(styles);


const Review = ({ match, history, id, className, name, day, money, star, content }) => {

const [value, setValue] = React.useState(star);

if (star==null){
    return(
    <div className={cx('review-container', className)}>
      <div className={cx('review-wapper')}>
        <div className={cx('review-content')}>
          <div className={cx('name')}>{name}</div>
          <div className={cx('UnReview-rowItem')}>
            <span className={cx('label')}>맡긴 날짜</span>
            <div className={cx('day')}>{day}</div>
          </div>
          <div className={cx('UnReview-rowItem')}>
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


 return(
    <div className={cx('review-container', className)}>
      <div className={cx('review-wapper')}>

        <div className={cx('review-content')}>
          <div className={cx('review_name')}>{name}</div>
           <div className={cx('review-image')}>
                <div className={cx('image')}><img src = {reviewimage}></img></div>
           </div>
          <div className={cx('Review-rowItem')}>
            <span className={cx('label')}>맡긴 날짜 : </span>
            <div className={cx('day')}>{day}</div>
          </div>
          <div className={cx('Review-rowItem')}>
             <span className={cx('label')}>평점 : </span>
             <div className={cx('star')}> <Rating name="read-only" value={value} readOnly /></div>

          </div>

             <div className={cx('reviewcontentlabel')}>리뷰내용</div>
             <div className={cx('content')}>{content}</div>


        </div>
        <Link to='/reviewmodify/1'>
          <div className={cx('update')}>
            <ArrowForwardIcon  style={{ fontSize: 30 }} />
          </div>
        </Link>
      </div>
    </div >
    )
}

}

export default Review;