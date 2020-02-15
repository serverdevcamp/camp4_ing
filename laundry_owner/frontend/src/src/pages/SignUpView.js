import React from "react";
import className from 'classnames';
import styles from '../components/SignUpView/SignUpView.scss';
import SignUpInputForm from "../components/SignUpView/SignUpInputForm";
import axios from 'axios';
import EndPoint from "../config/EndPoint";

const cx = className.bind(styles);

class SignUpView extends React.Component {

  state = {
    businessNum: '',
    shopName: '',
    userName: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    image: '',
    address: '',
    detailAddress: '',
    tel: '',
    information: '',
    operationTimes: [],

    detailAddressRef: React.createRef(),
  };

  onChangeBusinessNum = (businessNum) => {
    this.setState({
      businessNum: businessNum
    });
  };

  onChangeShopName = (shopName) => {
    this.setState({
      shopName: shopName
    });
  };

  onChangeUserName = (userName) => {
    this.setState({
      userName: userName
    });
  };

  onChangePassword = (password) => {
    this.setState({
      password: password
    });
  };

  onChangePasswordConfirm = (passwordConfirm) => {
    this.setState({
      passwordConfirm: passwordConfirm
    })
  };

  onChangeName = (name) => {
    this.setState({
      name: name
    })
  };

  onChangeEmail = (email) => {
    this.setState({
      email: email
    })
  };

  onChangeImage = (image) => {
    this.setState({
      image: image
    });
  };

  onChangeAddress = (address) => {
    this.setState({
      address: address
    });
  };

  onChangeDetailAddress = (detailAddress) => {
    this.setState({
      detailAddress: detailAddress
    });
  };

  onChangeTel = (tel) => {
    this.setState({
      tel: tel
    });
  };

  onChangeInformation = (information) => {
    this.setState({
      information: information
    });
  };

  addOperationTime = (operationTime) => {
    this.setState({
      operationTimes: [
        ...this.state.operationTimes,
        operationTime
      ]
    })
  };

  handleSignUp = () => {
    const {businessNum, shopName, userName, password, passwordConfirm, operationTimes} = this.state;
    const {name, email, image, address, detailAddress, tel, information} = this.state;

    const profile = {
      profile: {
        username:userName, password, email, address,
        detail_address: detailAddress,
        phone: tel,
        business_num: businessNum,
        nickname : '0'
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
      .then(response=>{
        if(response.data == null) {
          console.error("에러");
          return;
        }
        alert('회원가입이 완료 됐습니다.');
        window.location.href = '/';
      })
      .catch(err=>{
        console.log(err);
      })

  };

  render() {

    const {businessNum, shopName, userName, password, passwordConfirm, operationTimes} = this.state;
    const {name, email, image, address, detailAddress, tel, information} = this.state;
    const {detailAddressRef} = this.state;
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
            onChangeBusinessNum={this.onChangeBusinessNum}
            onChangeShopName={this.onChangeShopName}
            onChangeUserName={this.onChangeUserName}
            onChangePassword={this.onChangePassword}
            onChangePasswordConfirm={this.onChangePasswordConfirm}
            onChangeName={this.onChangeName}
            onChangeEmail={this.onChangeEmail}
            onChangeImage={this.onChangeEmail}
            onChangeAddress={this.onChangeAddress}
            onChangeDetailAddress={this.onChangeDetailAddress}
            onChangeTel={this.onChangeTel}
            onChangeInformation={this.onChangeInformation}
            addOperationTime={this.addOperationTime}
            detailAddressRef={detailAddressRef}
            handleSignUp={this.handleSignUp}
          />
        </div>
      </div>
    )
  }
}

export default SignUpView;