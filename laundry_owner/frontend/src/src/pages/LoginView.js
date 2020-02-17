import React from 'react';
import styles from '../components/LoginView/LoginView.scss';
import className from 'classnames/bind';
import LoginInput from '../components/LoginView/LoginInput';
import axios from 'axios';
import EndPoint from "../config/EndPoint";

const cx = className.bind(styles);

class LoginView extends React.Component {

  state = {
    userName : '',
    password : ''
  };

  onChangeUserName = (userName) =>{
    this.setState({
      userName : userName
    });
  };

  onChangeUserPassword = (password) =>{
    this.setState({
      password : password
    });
  };

  handleLogin = () =>{
    axios.post(`${EndPoint.authServer}/myauth/login/`,{
      profile : {
        username : this.state.userName,
        password : this.state.password
      }
    }).then(response => {
      console.log(response.data);
    });
  };

  render() {

    const {userName,password} = this.state;
    const {onChangeUserName, onChangeUserPassword,handleLogin} = this;

    function handleSignUp() {
      window.location.href = "/signup";
    }

    return (
      <div className={cx("loginPage")}>
        <div className={cx('loginContent')}>
          <div className={cx('leftPage')}>
            <span className={cx('title')}>Laundry Runner</span>
            <span className={cx('subTitle')}>For 사장님</span>
          </div>
          <div className={cx('rightPage')}>
            <LoginInput
          userName = {userName}
          password = {password}
          onChangeUserName = {onChangeUserName}
          onChangePassword = {onChangeUserPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}/>
        </div>
        </div>
      </div>
    );
  }
}

export default LoginView;