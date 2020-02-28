import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from 'react-modal';
import className from 'classnames';
import DaumPostcode from 'react-daum-postcode';
import styles from './ProfileInputForm.scss';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';
import {Link} from 'react-router-dom';


const cx = className.bind(styles);

const ProfileInputForm = ({ nickname, email, password, phone, address, detailAddress, setEmail, setNickname, setPassword, setPhone, setAddress, setDetailAddress, detailAddressRef, modifyProfile }) => {

   const [isOpenedModal, setIsOpenedModal] = useState(false);

    const onToggleModal = () => {
    setIsOpenedModal(!isOpenedModal);
  };

  const onClickAddress = (objAddress) => {
    setAddress(objAddress.address);
    onToggleModal();
    console.log(detailAddressRef);
    detailAddressRef.current.focus();
  };


    return (
      <div className={cx('profileInputContent')}>
        <form className={cx('profileForm')}>
          <div className={cx('nickname-wrapper')}>
            <label>
                <span className={cx('label')}>고마운 분</span>
                <div className={cx('nickname-inputWrapper')}>
                    <CustomInput className={cx('niminputText')} type={'text'} required={true} value={nickname}  onChangeEvent={e => setNickname(e.target.value)}/>
                    <span className={cx('nimlabel')}>님</span>
                </div>
             </label>
          </div>
          <div className={cx('profile-except-nickname')}>
          <span className={cx('ProfileModification-rowItem')}>
            <span className={cx('label')}>이메일</span>
            <span className={cx('inputText')}>{email}</span>
          </span>
          <span className={cx('ProfileModification-rowItem')}>
            <span className={cx('label')}>비밀번호</span>
            <div className={cx('inputButtomWapper')}>
                <CustomInput className={cx('inputPassText', 'inputWithButton')}
                type={'password'}
                required={true}
                placeHolder={'10~20자 이내'}
                value={password}
                 />
                <CustomButton
                    className={cx('subButton')}
                    type={'button'}
                    value={'변경'}
                />
             </div>
          </span>
          <span className={cx('ProfileModification-rowItem')}>
            <span className={cx('label')}>휴대폰번호</span>
            <span className={cx('inputText')}>{phone}</span>
          </span>
          <label>
            <span className={cx('label')}>주소</span>
            <div className={cx('inputButtomWapper')}>
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
              type='text'
              required={true}
              reference={detailAddressRef}
              placeHolder={'상세주소를 입력해주세요.'}
              value = {detailAddress}
              onChangeEvent={e => setDetailAddress(e.target.value)}
            />
          </label>
          </div>
          <div className={cx('Tailer')}>
          <Link className={cx('Link')} to={"#"}> 로그아웃</Link> <Link className={cx('Link')} to={"#"}>탈퇴</Link>
          </div>
          <CustomButton
            className={cx('ProfileButton')}
            type={'button'}
            onClick={modifyProfile}
            value={'저장'}
          />
        </form>

        <Modal
          isOpen={isOpenedModal}
          className={cx('profileAddressModal')}
        >
          <span className={cx('closeBtn')} onClick={onToggleModal}>닫기</span>
          <DaumPostcode onComplete={data => onClickAddress(data)} />
        </Modal>
      </div>
    )
}


Modal.setAppElement('#root');

export default ProfileInputForm;