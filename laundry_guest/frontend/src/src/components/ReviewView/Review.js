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

const cx = className.bind(styles);


const Review = ({ match, id, className, name, day, money, star, content }) => {

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
            <CustomButton
                    className={cx('subButton')}
                    type={'button'}
                    value={'리뷰쓰기'}
                />

                <CustomButton
                    className={cx('subButton')}
                    type={'button'}
                    value={'가게상세'}
                />

                <CustomButton
                    className={cx('subButton')}
                    type={'button'}
                    value={'주문상세'}
                />

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
let starshape = null;
 if(0<=star && star<1){ starshape =<span className={cx('zerostar')}>0.0</span>;}
 if(1<=star && star<2){ starshape =<div><StarIcon/></div>;}
 if(2<=star && star<3){ starshape =<div><StarIcon/><StarIcon/></div>;}
 if(3<=star && star<4){ starshape =<div><StarIcon/><StarIcon/><StarIcon/></div>;}
 if(4<=star && star<5){ starshape =<div><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>;}
 if(star==5){ starshape =<div><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>;}


 return(
    <div className={cx('review-container', className)}>
      <div className={cx('review-wapper')}>

        <div className={cx('review-content')}>
          <div className={cx('review_name')}>{name}</div>
           <div className={cx('review-image')}>
                <div className={cx('image')}></div>
           </div>
          <div className={cx('Review-rowItem')}>
            <span className={cx('label')}>맡긴 날짜 : </span>
            <div className={cx('day')}>{day}</div>
          </div>
          <div className={cx('Review-rowItem')}>
             <span className={cx('label')}>평점 : </span>
             <div className={cx('star')}>{starshape}</div>

          </div>

             <div className={cx('reviewcontentlabel')}>리뷰내용</div>
             <div className={cx('content')}>{content}</div>


        </div>
        <Link to={`${match.url}/${id}`}>
          <div className={cx('update')}>
            <ArrowForwardIcon  style={{ fontSize: 30 }}  />
          </div>
        </Link>
      </div>
    </div >
    )
}

}

export default Review;