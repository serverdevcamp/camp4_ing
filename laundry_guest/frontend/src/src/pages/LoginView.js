import React from 'react';
import styles from '../components/LoginView/LoginView.scss';
import className from 'classnames/bind'

import LoginInput from '../components/LoginView/LoginInput';

const cx = className.bind(styles);

class LoginView extends React.Component {
  render() {

    function handleSignUp() {
      window.location.href = "/signup";
    }
    return (
      <div className={cx("loginPage")}>
        <div className={cx("loginHeader")}>
          LaundryRunner
        </div>
        <div className={cx("loginContent")}>
          <LoginInput handleSignUp={handleSignUp} />
        </div>
      </div>
    );
  }
}

export default LoginView;