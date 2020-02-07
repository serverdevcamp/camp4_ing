import React from "react";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import style from './ReviewItem.scss';
import className from 'classnames';
import {makeStyles} from "@material-ui/core/styles";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CustomButton from "../Common/CustomButton";
const cx = className.bind(style);

const customStyle = makeStyles({
    card : {
        flex : 1,
        height : '200px',
        borderRadius : '20px'
    },
    cardContent : {
        display : 'flex',
        flexDirection : 'column'
    }

});

const ReviewItem = () =>{

    const styles = customStyle();
    return(
        <div className={cx('review-rowDiv')}>
            <Card className={styles.card}>
                <CardContent>
                    <div className={cx('review-detail')}> 고객 ID : ABCDEFG</div>
                    <div className={cx('review-detail')}> 평점 : <span className={cx('review-starSize')}>⭐️⭐️⭐️⭐️⭐️</span>  날짜 : 20/01/15 15:32:11</div>
                    <div className={cx('review-detail')}> 리뷰 내용 </div>
                    <textarea className={cx('review-reviewArea')} readOnly/>
                </CardContent>
            </Card>

            <ArrowRightIcon
                style={{
                    color: "#65AD5A",
                    fontSize : "35px",
                    marginLeft : "10px",
                    marginRight :  "10px"
                    }}
            />

            <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <div> 답글이 등록되어 있지 않아 있어요 :)</div>
                    <textarea className={cx('review-replyArea')}/>
                    <CustomButton className={cx('review-modifyBtn')} value={"등록하기"}/>
                </CardContent>
            </Card>

        </div>
    )
};

export default ReviewItem;