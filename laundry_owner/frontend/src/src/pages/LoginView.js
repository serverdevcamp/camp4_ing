import React, {useState} from 'react';
import styles from '../components/LoginView/LoginView.scss';
import className from 'classnames/bind';
import LoginInput from '../components/LoginView/LoginInput';
import axios from 'axios';
import EndPoint from "../config/EndPoint";
import {useDispatch, useSelector} from "react-redux";
import {setShopId, setUserName} from "../modules/profile";

const cx = className.bind(styles);

const LoginView = ({}) => {

  const [userName, setUserNameState] = useState('');
  const [password, setPasswordState] = useState('');
  const profile = useSelector(state => state.profile, []);
  const dispatch = useDispatch();

  const onChangeUserName = (userName) => {
    setUserNameState(userName);
  };

  const onChangeUserPassword = (password) => {
    setPasswordState(password);
  };

  const setReduxUserName = (userName) => {
    dispatch(setUserName('hello'));
  };


  const handleLogin = () => {
    axios.post(`${EndPoint.authServer}/myauth/login/`, {
        profile: {
          username: userName,
          password: password
        }
      },
      {withCredentials: true})
      .then(response => {
        setReduxUserName(userName);
        console.log(response.data);
      });
  };


  const handleSignUp = () => {
    window.location.href = "/signup";
  };


  return (
    <div className={cx("loginPage")}>
      <div className={cx('loginContent')}>
        <div className={cx('leftPage')}>
          <span className={cx('title')}>Laundry Runner</span>
          <span className={cx('subTitle')}>For 사장님</span>
        </div>
        <div className={cx('rightPage')}>
          <LoginInput
            userName={userName}
            password={password}
            onChangeUserName={onChangeUserName}
            onChangePassword={onChangeUserPassword}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}/>
        </div>
      </div>
    </div>
  );

};

export default LoginView;