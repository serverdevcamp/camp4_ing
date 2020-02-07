import React from 'react';
import classNames from 'classnames';
import styles from './LoginInput.scss';
import {Link} from "react-router-dom";

const cx = classNames.bind(styles);

const LoginInput = ({ handleLogin, handleSignUp,handleFindPassword}) => {

    return (
        <div className={cx('inputContent')}>
            <span className={cx('inputTitle')}>아이디와 비밀번호를 입력해주세요</span>
            <form action="#">
                <label> <span className={cx('label')}>ID</span> <input className={cx('inputText')} type={'email'} required/> </label>
                <label> <span className={cx('label')}>비밀번호</span> <input className={cx('inputText')} type={'password'} required/></label>
                <span className={cx('findPassword')}><Link to={"/signup"}>비밀번호 찾기</Link></span>
                <input type={'submit'} className={cx('submitBtn')} value={"로그인"} />
                <input type={'button'} className={cx('submitBtn')} value={"회원가입"} onClick={handleSignUp}/>
            </form>
        </div>
    )
};

export default LoginInput