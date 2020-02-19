import React from 'react';
import className from 'classnames';
import Header from '../components/Common/Header';
import styles from '../components/ReviewRegisterView/ReviewRegisterView.scss';
import ReviewRegisterInputForm from '../components/ReviewRegisterView/ReviewRegisterInputForm';

const cx = className.bind(styles);


class ReviewRegisterView extends React.Component {
  render() {

     const handleMain = () => {
      window.location.href = '/';
    }


    return (
      <div className={cx('ReivewRegisterPage')} id={'ReivewRegisterPage'}>
        <Header name={"리뷰등록"} handle={handleMain} />
          <ReviewRegisterInputForm/>
      </div>
    )
  }
}

export default ReviewRegisterView;