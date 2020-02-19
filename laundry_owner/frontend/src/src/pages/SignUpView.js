import React, {useRef, useState} from "react";
import className from 'classnames';
import styles from '../components/SignUpView/SignUpView.scss';
import SignUpInputForm from "../components/SignUpView/SignUpInputForm";
import axios from 'axios';
import EndPoint from "../config/EndPoint";

const cx = className.bind(styles);

const SignUpView = () => {

  const [businessNum, setBusinessNum] = useState('');
  const [shopName, setShopName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState();
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [tel, setTel] = useState('');
  const [information, setInformation] = useState('');
  const [operationTimes, setOperationTimes] = useState([]);
  const detailAddressRef = useRef(() => React.createRef());

  const [isValidId,setValidId] = useState(false);

  const onChangeBusinessNum = (businessNum) => {
    setBusinessNum(businessNum);
  };

  const onChangeShopName = (shopName) => {
    setShopName(shopName);
  };

  const onChangeUserName = (userName) => {
    setUserName(userName);
    setValidId(false);
  };

  const onChangePassword = (password) => {
    setPassword(password);
  };

  const onChangePasswordConfirm = (passwordConfirm) => {
    setPasswordConfirm(passwordConfirm);
  };

  const onChangeName = (name) => {
    setName(name);
  };

  const onChangeEmail = (email) => {
    setEmail(email);
  };

  const onChangeImage = (image) => {
    setImage(image);
  };

  const onChangeAddress = (address) => {
    setAddress(address);
  };

  const onChangeDetailAddress = (detailAddress) => {
    setDetailAddress(detailAddress);
  };

  const onChangeTel = (tel) => {
    setTel(tel);
  };

  const onChangeInformation = (information) => {
    setInformation(information)
  };

  const addOperationTime = (operationTime) => {
    setOperationTimes([
      ...operationTimes,
      operationTime
    ]);
  };

  const checkDuplicate = (userName) => {
    axios.put(`${EndPoint.authServer}/myauth/sign_up/`,{
      username : userName
    })
      .then(response => {
        console.log(response.data);
        if(response.data.response !== 'success'){
          console.log(response);
          return;
        }
        alert('사용가능한 id입니다.');
        setValidId(true);
      })
      .catch(err => {
        console.log('checkDuplicateCheck Err!',err);
      })
  };

  const handleSignUp = () => {

    if(isValidId===false){
      alert('아이디 중복체크를 하십시오');
      return;
    }

    if(password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
      return;
    }

    const profile = {
      profile: {
        username: userName, password, email, address,
        detail_address: detailAddress,
        phone: tel,
        business_num: businessNum,
        nickname: '0'
      },
      name,
      tel,
      information,
      operating_time: operationTimes,
      min_price: "0",
      delivery_dt: "0",

    };

    axios.post(`${EndPoint.authServer}/myauth/sign_up/`, {
      profile: profile
    })
      .then(response => {
        if (response.data == null) {
          console.error("서버와의 통신이 원활하지 않습니다.");
          return;
        }

        if(response.data.response !== 'success'){
          alert('회원가입을 진행할 수 없습니다. \n올바른 데이터를 입력해주십시오');
          return;
        }

        alert('회원가입이 완료 됐습니다.');
        window.location.href = '/';
      })
      .catch(err => {
        console.log(err);
      })

  };


  return (
    <div className={cx('signUpPage')} id={'signUpPage'}>
      <div className={cx('signUpHeader')}>
        <span className={cx('signUpTitle')}>Laundry Runner</span>
        <span className={cx('signUpSubTitle')}>회원가입</span>
      </div>
      <div className={cx('signUpBox')}>
        <SignUpInputForm
          businessNum={businessNum}
          shopName={shopName}
          userName={userName}
          password={password}
          passwordConfirm={passwordConfirm}
          name={name}
          email={email}
          image={image}
          address={address}
          detailAddress={detailAddress}
          tel={tel}
          information={information}
          operationTimes={operationTimes}
          onChangeBusinessNum={onChangeBusinessNum}
          onChangeShopName={onChangeShopName}
          onChangeUserName={onChangeUserName}
          onChangePassword={onChangePassword}
          onChangePasswordConfirm={onChangePasswordConfirm}
          onChangeName={onChangeName}
          onChangeEmail={onChangeEmail}
          onChangeImage={onChangeEmail}
          onChangeAddress={onChangeAddress}
          onChangeDetailAddress={onChangeDetailAddress}
          onChangeTel={onChangeTel}
          onChangeInformation={onChangeInformation}
          addOperationTime={addOperationTime}
          detailAddressRef={detailAddressRef}
          handleSignUp={handleSignUp}
          checkDuplicate = {checkDuplicate}
        />
      </div>
    </div>
  )

};

export default SignUpView;