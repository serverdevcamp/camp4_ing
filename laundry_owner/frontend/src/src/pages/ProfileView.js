import React, {useEffect, useState} from "react";
import className from 'classnames';
import backgroundStyle from '../components/Common/Background.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import ProfileModificationForm from "../components/ProfileView/ProfileModificationForm";
import {useSelector} from "react-redux";
import EndPoint from "../config/EndPoint";
import axios from 'axios';

const cx = className.bind(backgroundStyle);

const ProfileView = () => {

  const profile = useSelector(state => state.profile);

  const [businessNum, setBusinessNum] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [tel, setTel] = useState('');
  const [information, setInformation] = useState('');
  const [operatingTime, setOperatingTime] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [deliveryAt, setDeliveryAt] = useState('');

  const getProfile = () => {
    const url = `${EndPoint.authServer}/myauth/profile/${profile.userId}`;
    axios.get(url)
      .then(response => {
        if (response.data.response !== "success") {
          alert('회원정보를 받아오는 중 오류가 발생했습니다.');
          return;
        }
        const data = response.data.data;
        setName(data.name);
        setAddress(data.profile.address);
        setDetailAddress(data.profile.detail_address);
        setTel(data.tel);
        setInformation(data.information);
        setOperatingTime(data.operating_time);
      })
      .catch(err =>
        console.log(err)
      );
  };

  const modifyProfile = () => {
    const url = `${EndPoint.authServer}/myauth/profile/${profile.userId}`;
    const data = {
      profile: {
        address,
        detail_address: detailAddress
      },
      name,
      tel,
      information,
      operating_time: operatingTime
    };

    axios.put(url, {profile: data})
      .then(response => {
        if (response.data.response !== 'success') {
          alert('정보 수정을 요청하는 도중 문제가 발생했습니다.');
          return;
        }
        alert('정보 수정을 정상적으로 처리했습니다.');
        getProfile();
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={cx('defaultBackground')}>
      <DefaultHeader title={"정보 수정"}/>
      <DefaultMainBody menuIndex={1}>
        <ProfileModificationForm
          name={name}
          address={address}
          detailAddress={detailAddress}
          tel={tel}
          information={information}
          operatingTime={operatingTime}
          setName={setName}
          setAddress={setAddress}
          setDetailAddress={setDetailAddress}
          setTel={setTel}
          setInformation={setInformation}
          setOperatingTime={setOperatingTime}
          modifyProfile={modifyProfile}
        />
      </DefaultMainBody>
    </div>
  )

};

export default ProfileView;