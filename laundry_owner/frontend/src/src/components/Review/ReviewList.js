import React from "react";
import ReviewItem from "./ReviewItem";
import DefaultMainBody from "../Common/DefaultMainBody";

const ReviewList = ({reviews,replyReview,modifyReview}) => {

  let index = 0;

  return(
    <div>
      {reviews.map(item => (
        <ReviewItem
          key={index++}
          item={item}
          replyReview={replyReview}
          modifyReview={modifyReview}
        />
      ))}
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