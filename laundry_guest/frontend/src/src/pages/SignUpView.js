import React, { useState, useRef } from 'react';
import className from 'classnames';
import styles from '../components/SignUpView/SignUpView.scss';
import axios from 'axios';
import EndPoint from "../config/EndPoint";
import SignUpInputForm from '../components/SignUpView/SignUpInputForm';

const cx = className.bind(styles);

const SignUpView = ({ }) => {
  const [agreementCheck, setAgreementCheck] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [isValidUsername, setValidUsername] = useState(false);
  const detailAddressRef = useRef();

  const handleSignUp = () => {

    if (agreementCheck === false) {
      alert('약관에 동의하셔야 합니다.');
      return;
    }
    if (isValidUsername === false) {
      alert('아이디 중복 체크를 해야합니다.')
      return;
    }

    if (password !== checkPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return;
    }

    const profile = {
      username: username,
      password: password,
      email: email,
      nickname: nickname,
      address: address,
      detail_address: detailAddress,
      phone: phone
    };

    axios.post(`/myauth/sign_up/`, {
      profile: profile
    })
      .then(response => {
        if (response.data == null) {
          alert("error");
          console.error('서버와 통신이 원활하지 않습니다.');
          return;
        }
        else if (response.data.response === 'success') {
          alert('회원가입에 성공하였습니다.\n 이메일 인증을 하셔야합니다.');
          window.location.href = '/login';
        }
        else {
          console.log(response.data.message);
          alert('회원가입에 실패하였습니다.\n 정보를 다시 확인해주세요.')
        }
      })
  }

  //   {
  //     "profile": {
  //         "username": "rkdalstjd1",
  //         "password": "password1",
  //         "email": "rkdalstjd9@naver.com",
  //         "nickname": "사장님2",
  //         "address": "서울특별시 동대문구 전농동",
  //         "detail_address": "주영리빙텔 109호",
  //         "phone": "01000000000",
  //         "business_num": "12345"
  //     }
  // }

  const checkDuplicate = (username) => {
    axios.get(`/myauth/check_duplicate/${username}/`)
      .then(response => {
        if (response.data.response === 'success') {
          alert('사용가능한 아이디입니다.');
          setValidUsername(true);
        }
        else
          alert('이미 존재하는 아이디입니다.');
      })
  }

  return (
    <div className={cx('signUpPage')} id={'signUpPage'}>
      <div className={cx('signUpHeader')}>
        <div>LaundryRunner</div>
        <div className={cx('pageDetail')}>회원가입</div>
      </div>
      <div className={cx('signUpContent')}>
        <SignUpInputForm
          agreementCheck={agreementCheck}
          username={username}
          password={password}
          checkPassword={checkPassword}
          email={email}
          nickname={nickname}
          address={address}
          detailAddress={detailAddress}
          phone={phone}
          setAgreementCheck={setAgreementCheck}
          setUsername={setUsername}
          setPassword={setPassword}
          setCheckPassword={setCheckPassword}
          setEmail={setEmail}
          setNickname={setNickname}
          setAddress={setAddress}
          setDetailAddress={setDetailAddress}
          setPhone={setPhone}
          detailAddressRef={detailAddressRef}
          checkDuplicate={checkDuplicate}
          setValidUsername={setValidUsername}
          handleSignUp={handleSignUp}
        />
      </div>
    </div>
  )
}

export default SignUpView;