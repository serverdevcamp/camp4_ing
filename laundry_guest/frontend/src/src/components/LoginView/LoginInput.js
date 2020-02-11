import React from 'react';
import classNames from 'classnames';
import styles from './LoginInput.scss';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';

const cx = classNames.bind(styles);

const LoginInput = ({ handleSignUp }) => {
  return (
    <div className={cx('inputContent')}>
      <form action="#">
        <label>
          <span className={cx('label')}>아이디</span>
          <CustomInput
            className={cx('inputText')}
            type={'text'}
            required={true}
          />
        </label>
        <label>
          <span className={cx('label')}>비밀번호</span>
          <CustomInput
            className={cx('inputText')}
            type={'password'}
            required={true} />
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