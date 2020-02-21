import React, {useEffect} from "react";
import ReviewItem from "./ReviewItem";
import {Pagination} from '@material-ui/lab';
import DefaultMainBody from "../Common/DefaultMainBody";

const ReviewList = ({
                      reviews, reviewCount,
                      replyReview, modifyReview, getReviews
                    }) => {

  let index = 0;

  useEffect(() => {
    console.log(reviewCount);
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: 'column',
    }}>
      {reviews.map(item => (
        <ReviewItem
          key={index++}
          item={item}
          replyReview={replyReview}
          modifyReview={modifyReview}
        />
      ))}
      <Pagination
        count={reviewCount}
        style={{marginLeft: "auto", marginRight: "auto"}}
        onChange={(event, page) => getReviews(page)}
      />
    </div>
  );
};

export default ReviewList;

//userName={item.profile.username}
//           grade={item.grade}
//           writeDate={item.created_at}
//           content={item.content}
//           replyContent={item.comment.content}
//           replyDate={item.comment.created_at}
//