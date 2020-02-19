import React, {useEffect, useState} from "react";
import axios from 'axios';
import className from "classnames";
import style from '../components/Common/Background.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import {Typography} from "@material-ui/core";
import ReviewItem from "../components/Review/ReviewItem";
import {useSelector} from "react-redux";
import EndPoint from "../config/EndPoint";
import ReviewList from "../components/Review/ReviewList";

const cx = className.bind(style);

const Review = ({}) => {

  const profile = useSelector(state => state.profile, []);

  const [reviews, setReviews] = useState([]);

  const getReviews = () => {
    const url = `${EndPoint.logicServer}/mylaundry/review/${profile.shopId}`;
    axios.get(url)
      .then(response => {

        //@TODO 이부분 나중에 수정 필요!!
        if (response.data == null) {
          alert('error');
          return;
        }

        if (response.data.response !== "success") {
          alert('리뷰 요청 중에 오류가 발생했습니다.');
          return;
        }
        setReviews(response.data.data.results);
      });
  };

  const replyReview = (reviewId, content) => {
    const url = `${EndPoint.logicServer}/mylaundry/review/${profile.shopId}/${reviewId}`;
    console.log(url);
    axios.post(url, {
      comment: {
        content: content
      }
    })
      .then(response => {
        if(response.data.response !== 'success'){
          alert('리뷰 등록중 오류가 발생했습니다.');
          return;
        }
        alert('리뷰 등록이 정상적으로 처리 됐습니다.');
        getReviews();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const modifyReview = (reviewId, content) => {
    const url = `${EndPoint.logicServer}/mylaundry/review/${profile.shopId}/${reviewId}`;
    axios.put(url, {
      "comment": {
        content
      }
    })
      .then(response => {
        if(response.data.response !== 'success'){
          alert('리뷰 수정 중 오류가 발생했습니다.');
          return;
        }
        alert('리뷰 수정이 정상적으로 처리 됐습니다.');
        getReviews();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(getReviews, 50);
  }, []);

  return (
    <div className={cx('defaultBackground')}>
      <DefaultHeader title={"리뷰관리"}/>
      <DefaultMainBody menuIndex={3}>
        <Typography
          variant={"h6"}
        >
          리뷰 관리
        </Typography>
        <ReviewList
          reviews={reviews}
          replyReview={replyReview}
          modifyReview={modifyReview}
        />

      </DefaultMainBody>
    </div>
  )
};

export default Review;