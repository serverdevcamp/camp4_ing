import React from 'react';
import Modal from 'react-modal';
import className from 'classnames';
import DaumPostcode from 'react-daum-postcode';
import styles from './SignUpInputForm.scss';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';


const cx = className.bind(styles);

class SignUpInputForm extends React.Component {

  detailedAddress = React.createRef();

  state = {
    isOpenedModal: false,
    address: ''
  };

  // handleAddress = (data) => {
  //   let fullAddress = data.address;
  //   let extraAddress = '';

  //   if (data.addressType === 'R') {
  //     if (data.bname !== '') {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== '') {
  //       extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
  //     }
  //     fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
  //   }
  //   console.log(fullAddress);
  // }
  // 아이디 비밀번호 이메일 닉네임 주소 상세주소 폰
  render() {
    const onToggleModal = () => {
      this.setState({
        isOpenedModal: !this.state.isOpenedModal
      });
    };

    const onClickAddress = (objAddress) => {
      this.setState({
        address: objAddress.address
      });
      onToggleModal();
      this.detailedAddress.current.focus();
    };

    return (
      <div className={cx('signUpContent')}>
        <form className={cx('signUpForm')}>
          <label>
            <span className={cx('label')}>아이디</span>
            <CustomInput className={cx('inputText')} type={'text'} required={true} />
          </label>
          <label>
            <span className={cx('label')}>비밀번호</span>
            <CustomInput className={cx('inputText')} type={'password'} required={true} />
          </label>
          <label>
            <span className={cx('label')}>이메일</span>
            <CustomInput className={cx('inputText')} type={'email'} required={true} />
          </label>
          <label>
            <span className={cx('label')}>닉네임</span>
            <CustomInput className={cx('inputText')} type={'text'} required={true} />
          </label>
          <label>
            <span className={cx('label')}>주소</span>
            <CustomInput
              className={cx('inputText')}
              type={'text'}
              placeHolder={this.state.address}
              value={this.state.address}
              required={true}
              readOnly={true} />
            <CustomButton
              className={cx('SignUpButton')}
              type={'button'}
              onClick={onToggleModal}
              value={'검색'}
            />
          </label>
          <label>
            <span className={cx('label')}>상세주소</span>
            <CustomInput
              className={cx('inputText')}
              type={'text'}
              required={true}
              reference={this.detailedAddress} />
          </label>
          <label>
            <span className={cx('label')}>핸드폰 번호</span>
            <CustomInput className={cx('inputText')} type={'text'} required={true} />
          </label>
        </form>

        <Modal
          isOpen={this.state.isOpenedModal}
          className={cx('signUpAddressModal')}
        >
          <span className={cx('closeBtn')} onClick={onToggleModal}>닫기</span>
          <DaumPostcode onComplete={data => onClickAddress(data)} />
        </Modal>
      </div>
    )
  }

}

Modal.setAppElement('#root');

export default SignUpInputForm;