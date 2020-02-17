import React from 'react';
import classNames from 'classnames';
import styles from './LoginInput.scss';
import {Link} from "react-router-dom";

const cx = classNames.bind(styles);

const LoginInput = ({handleLogin, handleSignUp, handleFindPassword,userName,password,
                    onChangeUserName,onChangePassword}) => {

  return (
    <div className={cx('inputContent')}>
      <span className={cx('inputTitle')}>아이디와 비밀번호를 입력해주세요</span>
      <form action="#" onSubmit={handleLogin}>
        <label>
          <span className={cx('label')}>ID</span>
          <input
            className={cx('inputText')}
            type={'text'}
            value={userName}
            onChange={(e)=>onChangeUserName(e.target.value)}
            required/>
        </label>
        <label>
          <span className={cx('label')}>비밀번호</span>
          <input
            className={cx('inputText')}
            type={'password'}
            value={password}
            onChange={(e)=>onChangePassword(e.target.value)}
            required/>
        </label>
        <span className={cx('findPassword')}><Link to={"/signup"}>비밀번호 찾기</Link></span>
        <input type={'submit'} className={cx('submitBtn')} value={"로그인"}/>
        <input type={'button'} className={cx('submitBtn')} value={"회원가입"} onClick={handleSignUp}/>
      </form>
    </div>
  )
};

export default LoginInput