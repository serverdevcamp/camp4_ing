import React from 'react';
import classNames from 'classnames';
import styles from './LoginInput.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const LoginInput = ({ handleSignUp }) => {
  return (
    <div className={cx('inputContent')}>
      <form action="#">
        <label>
          <span className={cx('label')}>아이디</span>
          <input className={cx("inputText")} type={'text'} required />
        </label>
        <label>
          <span className={cx('label')}>비밀번호</span>
          <input className={cx("inputText")} type={'password'} required />
        </label>
        <input type={'submit'} className={cx('submitBtn')} value={"로그인"} />
        <input type={'button'} className={cx('submitBtn')} value={"회원가입"} onClick={handleSignUp} />
      </form>
    </div>
  )
};

export default LoginInput;