import React from 'react';
import className from 'classnames';
import Header from '../components/Common/Header';
import styles from '../components/ReviewRegisterView/ReviewRegisterView.scss';
import ReviewRegisterInputForm from '../components/ReviewRegisterView/ReviewRegisterInputForm';

const cx = className.bind(styles);

const reviewData ={
    shopname:'세탁맛집',
    day:'2020.01.15',
    star:0,
    content:'',
    image:''
}


class ReviewRegisterView extends React.Component {
  render() {

     const handleMain = () => {
      window.location.href = '/';
    }


    return (
      <div className={cx('ReivewRegisterPage')} id={'ReivewRegisterPage'}>
        <Header name={"리뷰등록"} handle={handleMain} />
          <ReviewRegisterInputForm
           shopname = {reviewData.shopname}
           day = {reviewData.day}
           star = {reviewData.star}
           content = {reviewData.content}
           image = {reviewData.image}
          />
      </div>
    )
  }
}

export default ReviewRegisterView;