import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './LoginInput.scss';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';

const cx = classNames.bind(styles);

const LoginInput = ({ handleSignUp, handleLogin, username, password, setUsernameState, setPasswordState }) => {

  return (
    <div className={cx('inputContent')}>
      <form action="#" onSubmit={handleLogin}>
        <label className={cx('idwrapper')}>
          <span className={cx('label')}>아이디</span>
          <CustomInput
            className={cx('idInputText')}
            type={'text'}
            //value={username}
            onChangeEvent={(e) => setUsernameState(e.target.value)}
            required={true}
          />
        </label>
        <label className={cx('passwordwrapper')}>
          <span className={cx('label')}>비밀번호</span>
          <CustomInput
            className={cx('passwordInputText')}
            type={'password'}
            value={password}
            onChangeEvent={(e) => setPasswordState(e.target.value)}
            required={true}
          />
        </label>
        <CustomButton
          className={cx('loginButton')}
          type={'submit'}
          value={"로그인"}
          isInActive={true}
        />
        <CustomButton
          className={cx('signUpButton')}
          type={'button'}
          value={'회원가입'}
          onClick={handleSignUp}
        />
        {/* <input type={'submit'} className={cx('submitBtn')} value={"로그인"} />
        <input type={'button'} className={cx('submitBtn')} value={"회원가입"} onClick={handleSignUp} /> */}
      </form>
    </div>
  )
};

export default LoginInput;