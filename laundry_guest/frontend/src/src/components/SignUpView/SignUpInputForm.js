import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from 'react-modal';
import className from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import DaumPostcode from 'react-daum-postcode';
import styles from './SignUpInputForm.scss';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';


const cx = className.bind(styles);

const SignUpInputForm = ({ agreementCheck, username, password, checkPassword, email, nickname, address, detailAddress, phone, setAgreementCheck, setUsername, setPassword, setCheckPassword, setEmail, setNickname, setAddress, setDetailAddress, setPhone, detailAddressRef, checkDuplicate, setValidUsername, handleSignUp }) => {

  const [isOpenedModal, setIsOpenedModal] = useState(false);


  // 아이디 비밀번호 이메일 닉네임 주소 상세주소 폰

  const onToggleModal = () => {
    setIsOpenedModal(!isOpenedModal);
  };

  const onClickAddress = (objAddress) => {
    setAddress(objAddress.address);
    onToggleModal();
    console.log(detailAddressRef);
    detailAddressRef.current.focus();
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setValidUsername(false);
  }

  return (
    <div className={cx('signUpInputContent')}>
      <form className={cx('signUpForm')} onSubmit={handleSignUp} action={"#"}>
        <div className={cx('agreementwrapper')}>
          <div className={cx('agreementTitle')}>
            약관내용
            </div>
          <div className={cx('agreementContent')}>
            <div className={cx('agreementRealContent')}>
              {"여기에는 동의와 관련된 내용을 넣을 껍니다. 그 내용을 어디서 가져올지는 저도 잘 모르겠습니다.".repeat(10)}
            </div>
          </div>
          <div className={cx('agreementCheck')}>
            <span className={cx('agreementCheckMessage')}>동의하시겠습니까?</span>
            <Checkbox
              value="secondary"
              color="primary"
              size='small'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onChange={e =>
                setAgreementCheck(!agreementCheck)}
            />
            {/* <input type='checkbox' /> */}
          </div>
        </div>
        <label>
          <span className={cx('label')}>아이디</span>
          <div className={cx('inputButtomwrapper')}>
            <CustomInput
              className={cx('inputText', 'inputWithButton')}
              type={'text'}
              required={true}
              onChangeEvent={onChangeUsername}
            />
            <CustomButton
              className={cx('subButton')}
              type={'button'}
              value={'검사'}
              onClick={() => checkDuplicate(username)}
            />
          </div>
        </label>
        <label>
          <span className={cx('label')}>비밀번호</span>
          <CustomInput
            className={cx('inputText')}
            type={'password'}
            required={true}
            onChangeEvent={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span className={cx('label')}>비밀번호 확인</span>
          <CustomInput
            className={cx('inputText')}
            type={'password'}
            required={true}
            onChangeEvent={e => setCheckPassword(e.target.value)}
          />
        </label>
        <label>
          <span className={cx('label')}>이메일</span>
          <CustomInput
            className={cx('inputText')}
            type={'email'}
            required={true}
            onChangeEvent={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span className={cx('label')}>닉네임</span>
          <CustomInput
            className={cx('inputText')}
            type={'text'}
            required={true}
            onChangeEvent={e => setNickname(e.target.value)}
          />
        </label>
        <label>
          <span className={cx('label')}>주소</span>
          <div className={cx('inputButtomwrapper')}>
            <CustomInput
              className={cx('inputText', 'inputWithButton')}
              type={'text'}
              placeHolder={address}
              value={address}
              required={true}
              readOnly={true} />
            <CustomButton
              className={cx('subButton')}
              type={'button'}
              onClick={onToggleModal}
              value={'검색'}
            />
          </div>
          <CustomInput
            className={cx('inputText', 'detailAddressInput')}
            type={'text'}
            required={true}
            reference={detailAddressRef}
            placeHolder={'상세주소를 입력해주세요.'}
            onChangeEvent={e => setDetailAddress(e.target.value)}
          />
        </label>
        <label>
          <span className={cx('label')}>핸드폰 번호</span>
          <CustomInput
            className={cx('inputText')}
            type={'text'}
            required={true}
            onChangeEvent={e => setPhone(e.target.value)}
          />
        </label>
        <CustomButton
          className={cx('SignUpButton')}
          type={'submit'}
          value={'회원가입'}
          isInActive={'false'}
        />
      </form>

      <Modal
        isOpen={isOpenedModal}
        className={cx('signUpAddressModal')}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <div className={cx('closeBtn')} onClick={onToggleModal}>
          <CloseIcon />
        </div>
        <DaumPostcode onComplete={data => onClickAddress(data)} />
      </Modal>
    </div>
  )
}

Modal.setAppElement('#root');

export default SignUpInputForm;