import React, { useState, useEffect } from 'react';
import className from 'classnames';
import Header from '../components/Common/Header';
import styles from '../components/ReviewModifyView/ReviewRegisterView.scss';
import ReviewRegisterInputForm from '../components/ReviewModifyView/ReviewRegisterInputForm';
import axios from 'axios';
import EndPoint from '../config/EndPoint';


const cx = className.bind(styles);

const reviewData ={
    shopname:'세탁맛집',
    day:'2020.01.15',
    star:5,
    content:'너무너무 매너가 좋으세요 세탁 다시 시키고 싶은 집^^!세탁물이 너무너무 깔끔하고 섬유유연제 좋은거 쓰는지 냄새도 좋네요 스멜스 굿!',
    image:''
}


const ReviewRegisterView = ({match, history}) => {

    const [review, setReview] =useState([]);
    const getReview = () => {
    axios.get(`${EndPoint.laundryServer}/laundry/{id}/review/{review_id}/`)
      .then(response => {
        if (response.data.response === 'success') {
          console.log(response.data.data);
          setReview(response.data.data);
        }
        else {
          console.error(response);
        }
      })
  }


     const handleMain = () => {
      window.location.href = '/';
    }


    return (
      <div className={cx('ReivewRegisterPage')} id={'ReivewRegisterPage'}>
        <Header name={"리뷰등록"} handle={handleMain} history ={history}/>
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

export default ReviewRegisterView;