import React, {useEffect, useState} from "react";
import {Card, CardContent} from "@material-ui/core";
import style from './ReviewItem.scss';
import className from 'classnames';
import {makeStyles} from "@material-ui/core/styles";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CustomButton from "../Common/CustomButton";

const cx = className.bind(style);

const customStyle = makeStyles({
  card: {
    flex: 1,
    height: '200px',
    borderRadius: '20px'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const ReviewItem = ({item, replyReview, modifyReview}) => {

  const styles = customStyle();
  const {profile, grade, created_at, comment, content, id} = item;

  const [tempGrade, setTempGrade] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');

  const initGrade = () => {
    const lists = [];
    for (let i = 0; i < grade; i++) {
      lists.push('temp');
    }
    setTempGrade(lists);
  };

  const initMessage = () => {
    if (item.comment == null) return;
    setReplyMessage(item.comment.content);
  };

  const DatetToString = (stringDate) => {
    const timeStamp = Date.parse(stringDate);
    const date = new Date(timeStamp);
    return `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + (date.getDate() + 1)).slice(-2)}`
      + ` ${('0' + (date.getHours())).slice(-2)}:${('0' + (date.getMinutes())).slice(-2)}:${('0' + (date.getSeconds())).slice(-2)}`;

  };

  useEffect(() => {
    setTimeout(initGrade, 50);
    setTimeout(initMessage, 50);
  }, []);


  return (
    <div className={cx('review-rowDiv')}>
      <Card className={styles.card}>
        <CardContent>
          <div className={cx('review-detail')}> 고객 ID : {profile.username}</div>
          <div className={cx('review-detail')}>
            평점 : <span className={cx('review-starSize')}>
            {tempGrade.map(item => (
              ('⭐')
            ))}
            ️</span>
            날짜 : {DatetToString(created_at)}
          </div>
          <div className={cx('review-detail')}> 리뷰 내용</div>
          <textarea
            className={cx('review-reviewArea')}
            value={content}
            readOnly/>
        </CardContent>
      </Card>

      <ArrowRightIcon
        style={{
          color: "#65AD5A",
          fontSize: "35px",
          marginLeft: "10px",
          marginRight: "10px"
        }}
      />

      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          {comment === null ?
            (<div> 답글이 등록되어 있지 않아 있어요 :)</div>) :
            (<div> {DatetToString(comment.created_at)} 에 작성됨 </div>)
          }

          <textarea
            className={cx('review-replyArea')}
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
          {
            comment == null ?
              (
                <CustomButton
                  className={cx('review-modifyBtn')}
                  value={"등록하기"}
                  onClick={() => replyReview(id, replyMessage)}
                />
              ) :
              (
                <CustomButton
                  className={cx('review-modifyBtn')}
                  value={"수정하기"}
                  onClick={() => modifyReview(comment.id, replyMessage)}
                />
              )
          }
        </CardContent>
      </Card>

    </div>
  )
};

export default ReviewItem;