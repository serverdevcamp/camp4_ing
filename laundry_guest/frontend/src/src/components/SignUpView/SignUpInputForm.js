import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from 'react-modal';
import className from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import DaumPostcode from 'react-daum-postcode';
import styles from './SignUpInputForm.scss';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';


const cx = className.bind(styles);

class SignUpInputForm extends React.Component {

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
      <div className={cx('signUpInputContent')}>
        <form className={cx('signUpForm')}>
          <div className={cx('agreementWapper')}>
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
              />
              {/* <input type='checkbox' /> */}
            </div>
          </div>
          <label>
            <span className={cx('label')}>아이디</span>
            <div className={cx('inputButtomWapper')}>
              <CustomInput className={cx('inputText', 'inputWithButton')} type={'text'} required={true} />
              <CustomButton
                className={cx('subButton')}
                type={'button'}
                value={'검사'}
              />
            </div>
          </label>
          <label>
            <span className={cx('label')}>비밀번호</span>
            <CustomInput className={cx('inputText')} type={'password'} required={true} />
          </label>
          <label>
            <span className={cx('label')}>비밀번호 확인</span>
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
          <label>
            <span className={cx('label')}>핸드폰 번호</span>
            <CustomInput className={cx('inputText')} type={'text'} required={true} />
          </label>
          <CustomButton
            className={cx('SignUpButton')}
            type={'button'}
            onClick={onToggleModal}
            value={'회원가입'}
            isInActive={'true'}
          />
        </form>

        <Modal
          isOpen={this.state.isOpenedModal}
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

}

Modal.setAppElement('#root');

export default SignUpInputForm;