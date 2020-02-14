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
          <div>LaundryRunner</div>
          <div className={cx('pageDetail')}>회원가입</div>
        </div>
        <div className={cx('signUpContent')}>
          <SignUpInputForm />
        </div>
      </div>
    )
  }
}

export default SignUpView;