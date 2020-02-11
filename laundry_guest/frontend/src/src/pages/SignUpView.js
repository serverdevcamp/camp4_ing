import React from 'react';
import className from 'classnames';
import styles from '../components/SignUpView/SignUpView.scss';
import SignUpInputForm from '../components/SignUpView/SignUpInputForm';

const cx = className.bind(styles);
class SignUpView extends React.Component {
  render() {
    return (
      <div className={cx('signUpPage')} id={'signUpPage'}>
        <div className={cx('signUpHeader')}>
          <span className={cx('signUpTitle')}>LaundryRunner</span>
          <span className={cx('signUpSubTitle')}>회원가입</span>
        </div>
        <div className={cx('signUpBox')}>
          <SignUpInputForm />
        </div>
      </div>
    )
  }
}

export default SignUpView;