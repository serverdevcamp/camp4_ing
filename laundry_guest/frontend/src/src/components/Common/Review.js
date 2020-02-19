import React from 'react';
import classNames from 'classnames';
import styles from './Review.scss';
import GradeIcon from '../Common/GradeIcon'

const cx = classNames.bind(styles);

const Review = ({ username, grade, content, createdAt }) => {

  return (
    <div className={cx('review-container')}>
      <div className={cx('review-wrapper')}>
        <div className={cx('author')}>{username}</div>
        <div className={cx('sub-data')}>
          <div className={cx('grade')}>
            <GradeIcon grade={grade} fontSize={16} />
          </div>
          <div className={cx('created-at')}>{createdAt}</div>
        </div>
        <div className={cx('content')}>{content}</div>
      </div>
    </div>
  )
}

export default Review;