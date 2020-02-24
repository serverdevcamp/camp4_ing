import React , { useState, useEffect } from 'react';
import styles from '../components/ReviewView/ReviewListView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import Menu from '../components/Common/Menu';
import Laundry from '../components/ReviewView/Review';
import { Link } from "react-router-dom";
import axios from 'axios';
import EndPoint from '../config/EndPoint';


const cx = className.bind(styles);

const unreivewData = [
  {
    id: 1,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원'
  },
  {
    id: 2,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원'
  },
  {
    id: 3,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원'
  },
  {
    id: 4,
    name: '크린토피아 전농점',
    day: '2020.01.06(월)',
    money: '270000원'
  },

];

const reviewData = [
 {
    id: 1,
    name: '크린토피아 전농점',
    day: '2020.01.06',
    star: 5,
    content: '너무너무 매너가 좋으세요 세탁 다시 시키고 싶은 집^^!세탁물이 너무너무 깔끔하고 섬유유연제 좋은거 쓰는지 냄새도 좋네요 스멜스 굿!'
  },
   {
    id: 2,
    name: '크린토피아 전농점',
    day: '2020.01.06',
    star: 4,
    content: '너무너무 매너가 좋으세요 세탁 다시 시키고 싶은 집^^!세탁물이 너무너무 깔끔하고 섬유유연제 좋은거 쓰는지 냄새도 좋네요 스멜스 굿!'
  },
   {
    id: 3,
    name: '크린토피아 전농점',
    day: '2020.01.06',
    star: 0,
    content: '너무너무 매너가 좋으세요 세탁 다시 시키고 싶은 집^^!세탁물이 너무너무 깔끔하고 섬유유연제 좋은거 쓰는지 냄새도 좋네요 스멜스 굿!'
  },
];

const ReviewView  = ({ match, history }) => {

const [reviews, setReviews] = useState([]);

const getReviews = () => {
    axios.get(`${EndPoint.laundryServer}/laundry/order/True`)
      .then(response => {
        if (response.data.response === 'success') {
          console.log(response.data.data);
          setReviews(response.data.data);
        }
        else {
          console.error(response);
        }
      })
  }




    const leftComponent = unreivewData.map(({ id, name, day, money}) => {
      return (
        <Laundry
          className={cx('review-item')}
          key={id}
          id={id}
          name={name}
          day={day}
          money={money}
          match={match}
        />
      )
    })


    const rightComponent = reviewData.map(({ id, name, day, star, content}) => {
      return (
        <Laundry
          className={cx('review-item')}
          key={id}
          id={id}
          name={name}
          day={day}
          star={star}
          content={content}
          match={match}
        />
      )
    })


    const handleMain = () => {
      window.location.href = '/';
    }

    useEffect(() => {
    getReviews();
  }, []);

    return (
      <div className={cx('order-list-page')} >
        <Header name={"리뷰조회"} handle={handleMain} />
        <Menu
          leftLabel={'리뷰 안한 주문'}
          rightLabel={'리뷰 남긴 주문'}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        >
        </Menu>
      </div>
    )
}

export default ReviewView;