import React, { useState } from 'react';
import styles from '../components/LoginView/LoginView.scss';
import className from 'classnames/bind';
import axios from 'axios';
import { useDispatch } from "react-redux";
import EndPoint from '../config/EndPoint';
import LoginInput from '../components/LoginView/LoginInput';
import { setUsernameRedux } from "../modules/profile";

const cx = className.bind(styles);

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"

const LoginView = ({ }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //const profile = useSelector(state => state.profile, []);
  const dispatch = useDispatch();

  const setReduxUsername = (username) => {
    dispatch(setUsernameRedux(username));
  }

  const handleLogin = () => {
    axios.post(`/myauth/login/`, {
      profile: {
        username: username,
        password: password
      }
    },
      { withCredentials: true }
    ).then(response => {
      if (response.data.response === 'success') {
        console.log(username);
        setReduxUsername(username);
        alert('로그인 성공');
        window.location.href = '/';
      }
      else
        alert(response.data.message);
    })
      .catch(err => {
        console.error(err);
      })
  }

  const handleSignUp = () => {
    window.location.href = "/signup";
  }

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
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
}

export default LoginView;