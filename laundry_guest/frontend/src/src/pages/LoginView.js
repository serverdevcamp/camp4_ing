import React, { useState } from 'react';
import styles from '../components/LoginView/LoginView.scss';
import className from 'classnames/bind';
import axios from 'axios';
import EndPoint from '../config/EndPoint';
import LoginInput from '../components/LoginView/LoginInput';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const cx = className.bind(styles);

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"

const LoginView = ({ }) => {

  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');

  const handleLogin = () => {
    axios.post(`${EndPoint.APIServer}/myauth/login/`, {
      profile: {
        username: username,
        password: password
      }
    },
      { withCredentials: true }
    ).then(response => {
      if (response.data.response === 'success') {
        alert('로그인 성공');
        window.location.href = '/';
      }
      else
        alert(response.data.message);
    })
  }

  const handleSignUp = () => {
    window.location.href = "/signup";
  }

  console.log(username);
  console.log(password);
  return (
    <div className={cx("loginPage")}>
      <div className={cx("loginHeader")}>
        <div>LaundryRunner</div>
        <div className={cx("pageDetail")}>로그인</div>
      </div>
      <div className={cx("loginContent")}>
        <LoginInput
          handleSignUp={handleSignUp}
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsernameState={setUsernameState}
          setPasswordState={setPasswordState}
        />
      </div>
    </div>
  );
}

export default LoginView;