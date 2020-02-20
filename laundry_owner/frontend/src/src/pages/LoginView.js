import React, {useState} from 'react';
import styles from '../components/LoginView/LoginView.scss';
import className from 'classnames/bind';
import LoginInput from '../components/LoginView/LoginInput';
import axios from 'axios';
import EndPoint from "../config/EndPoint";
import {useDispatch, useSelector} from "react-redux";
import {setShopId, setUserId, setUserName} from "../modules/profile";
import {useHistory} from 'react-router'

const cx = className.bind(styles);

const LoginView = ({}) => {

  const [userName, setUserNameState] = useState('');
  const [password, setPasswordState] = useState('');
  const profile = useSelector(state => state.profile, []);
  const dispatch = useDispatch();
  const history = useHistory();


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
        if(response.data.response !== `success`) {
          alert('아이디 또는 비밀번호가 올바르지 않습니다.');
          return;
        }
        console.log(response.data.user_id, response.data.shop_id);
        dispatch(setUserId(response.data.user_id));
        dispatch(setShopId(response.data.shop_id));
        history.push('/orderManagement');

      });
  };


  const handleSignUp = () => {
    history.push('/signup');
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