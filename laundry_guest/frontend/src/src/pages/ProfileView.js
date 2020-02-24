import React, { useState, useEffect, useRef} from 'react';
import className from 'classnames';
import Header from '../components/Common/Header';
import styles from '../components/ProfileView/ProfileView.scss';
import SignUpInputForm from '../components/ProfileView/ProfileInputForm';
import axios from 'axios';
import EndPoint from '../config/EndPoint';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const cx = className.bind(styles);

const ProfileView = ({ match }) => {

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const [id] = useState(match.url.split('/').pop());
  const detailAddressRef = useRef();

  const getProfile = () => {

    axios.get(`${EndPoint.authServer}/myauth/profile/${id}`)
      .then(response => {
        if (response.data.response === 'success') {
          setNickname(response.data.data['nickname']);
          setEmail(response.data.data['email']);
          setPassword(response.data.data['password']);
          setPhone(response.data.data['phone']);
          setAddress(response.data.data['address']);
          setDetailAddress(response.data.data['detail_address']);
        }
        else {
          console.log(response);
           alert('회원정보수정에 실패하였습니다.\n 정보를 다시 확인해주세요.')
        }
      })
  }

   const modifyProfile = () => {

    const data = {
      nickname: nickname,
      address: address,
      detail_address: detailAddress
    };

    axios.put(`${EndPoint.authServer}/myauth/profile/${id}`, {
      data: data
    })
      .then(response => {
        if (response.data == null) {
          alert("error");
          console.error('서버와 통신이 원활하지 않습니다.');
          return;
        }
        else if (response.data.response === 'success') {
          alert('회원정보수정에 성공하였습니다.');
          getProfile();
        }
        else {
          console.log(response.data.message);
          alert('회원정보수정에 실패하였습니다.')
        }
      })
  }


  useEffect(() => {
    getProfile();
  }, []);

   const handleMain = () => {
      window.location.href = '/';
   }

    return (
      <div className={cx('ProfilePage')} id={'ProfilePage'}>
        <Header name={"회원정보"} handle={handleMain} />
          <SignUpInputForm
          nickname = {nickname}
          email ={email}
          password={password}
          phone={phone}
          address={address}
          detailAddress={detailAddress}
          setEmail={setEmail}
          setNickname={setNickname}
          setPassword={setPassword}
          setPhone={setPhone}
          setAddress={setAddress}
          setDetailAddress={setDetailAddress}
          detailAddressRef={detailAddressRef}
          modifyProfile={modifyProfile}
          />
      </div>
    );

}

export default ProfileView;