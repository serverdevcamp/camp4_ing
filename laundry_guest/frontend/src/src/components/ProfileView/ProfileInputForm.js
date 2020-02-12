import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from 'react-modal';
import className from 'classnames';
import DaumPostcode from 'react-daum-postcode';
import styles from './ProfileInputForm.scss';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';


const cx = className.bind(styles);

class ProfileInputForm extends React.Component {

  detailedAddress = React.createRef();

  state = {
    isOpenedModal: false,
    address: '',
    checked: false,
    setChecked: false
  };

  componentDidMount() {
    if (!document.getElementById('material-ui-font')) {
      const materialUi = document.createElement('script');
      materialUi.id = 'material-ui-font';
      materialUi.src = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
      document.body.appendChild(materialUi);
    }

    if (!document.getElementById('material-ui-icon')) {
      const materialUi = document.createElement('script');
      materialUi.id = 'material-ui-icon';
      materialUi.src = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      document.body.appendChild(materialUi);
    }
  }

  // 닉네임, 이메일, 비번, 휴대폰 번호, 주소
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
      <div className={cx('profileInputContent')}>
        <form className={cx('profileForm')}>
          <div className={cx('nickname-wrapper')}>
            <label>
                <span className={cx('label')}>고마운 분</span>
                <div className={cx('nickname-inputWrapper')}>
                    <CustomInput className={cx('niminputText')} type={'text'} required={true} />
                    <span className={cx('nimlabel')}>님</span>
                </div>
             </label>
          </div>
          <div className={cx('profile-except-nickname')}>
          <span className={cx('ProfileModification-rowItem')}>
            <span className={cx('label')}>이메일</span>
            <span className={cx('inputText')}>sujin0970@naver.com</span>
          </span>
          <span className={cx('ProfileModification-rowItem')}>
            <span className={cx('label')}>비밀번호</span>
            <div className={cx('inputButtomWapper')}>
                <CustomInput className={cx('inputPassText', 'inputWithButton')}
                type={'password'}
                required={true}
                placeHolder={'10~20자 이내'}
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
            <span className={cx('inputText')}>010-@@@-@@@@</span>
          </span>
          <label>
            <span className={cx('label')}>주소</span>
            <div className={cx('inputButtomWapper')}>
              <CustomInput
                className={cx('inputText', 'inputWithButton')}
                type={'text'}
                placeHolder={this.state.address}
                value={this.state.address}
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
              reference={this.detailedAddress}
              placeHolder={'상세주소를 입력해주세요.'}
            />
          </label>
          </div>
          <CustomButton
            className={cx('ProfileButton')}
            type={'button'}
            onClick={onToggleModal}
            value={'저장'}
          />
        </form>

        <Modal
          isOpen={this.state.isOpenedModal}
          className={cx('profileAddressModal')}
        >
          <span className={cx('closeBtn')} onClick={onToggleModal}>닫기</span>
          <DaumPostcode onComplete={data => onClickAddress(data)} />
        </Modal>
      </div>
    )
  }

}

Modal.setAppElement('#root');

export default ProfileInputForm;