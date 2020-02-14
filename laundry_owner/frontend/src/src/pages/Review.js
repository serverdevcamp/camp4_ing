import React from "react";
import className from "classnames";
import style from '../components/Common/Background.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import {Typography} from "@material-ui/core";
import ReviewItem from "../components/Review/ReviewItem";

const cx = className.bind(style);

class Review extends React.Component {

  render() {

    return (
      <div className={cx('defaultBackground')}>
        <DefaultHeader title={"리뷰관리"}/>
        <DefaultMainBody menuIndex={3}>
          <Typography
            variant={"h6"}
          >
            리뷰 관리
          </Typography>

          <ReviewItem/>
          <ReviewItem/>
          <ReviewItem/>

        </DefaultMainBody>
      </div>
    )
  }
}

export default Review;