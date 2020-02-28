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
              1. 개인정보의 수집 및 이용 목적
  가. 서비스 제공에 관한 업무 이행 - 컨텐츠 제공, 특정 맞춤 서비스 제공(마이페이지, 뉴스레터 등), 기업 애로상담
  나. 회원관리
  - 회원제 서비스 이용 및 제한적 본인 확인제에 따른 본인확인, 개인식별, 가입의사 확인, 가입 및 가입횟수 제한, 추후 법정 대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 공지사항 전달
  2. 수집하는 개인정보의 항목
개인회원 가입
                필수항목 : 아이디, 비밀번호, 이름, 핸드폰번호, 이메일, 암호화된 이용자 확인값(CI)
                선택항목 : 이메일 수신여부, 문자수신여부, 웹진구독여부
기업회원 가입
                  필수항목 : 아이디, 비밀번호, 담당자 이름, 담당자 전화번호, 핸드폰번호, 이메일, (법인기업의 경우 법인등록번호), 기업정보(회사명, 대표자명, 사업자등록번호, 회사전화번호, 주소, 지역, 대표업종), 암호화된 이용자 확인값(CI)
                  선택항목 : 팩스번호, 홈페이지주소, 회사이메일주소, 창업일자, 부업종, 매출액, 수출액, 상시근로자 수, 주요생산품명, 이메일 수신여부, 문자수신여부, 이메일 수신여부, 문자수신여부, 웹진구독여부
전문가 가입
                    필수항목 : 아이디, 비밀번호, 이름, 핸드폰번호, 이메일, 협약사항, 지역, 암호화된 이용자 확인값(CI)
                    선택항목 : 소속기관명, 대표자명, 사업자번호, 소속기관 전화번호
                    전문가정보는 기업애로상담을 위한 목적으로 수집하나 보유하지 않고 비즈니스사업단으로 시스템연계 제공
                    본인인증시 암호화된 이용자 확인값(CI)은 SSO연계를 위한 용도로 제공
자동수집
                      IP주소, 쿠키, 서비스 이용기록, 방문기록 등
                      3. 개인정보의 보유 및 이용기간
                      기업마당은 원칙적으로 보유기간의 경과, 개인정보의 수집 및 이용목적의 달성 등 그 개인정보가 불필요하게 되었을 때에는 지체 없이 파기합니다. 다만, 다른 법령에 따라 보존하여야 하는 경우에는 그러하지 않을 수 있습니다. 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
                      회원정보
                      - 탈퇴 후 지체없이 파기
                      전문가정보
                      - 전문가 정보는 기업애로상담을 위한 목적으로 수집하나 보유하지 않고 비즈니스사업단으로 시스템연계 제공함
                      4. 동의거부권 및 불이익
                      정보주체는 개인정보 수집에 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의를 거부할 시 저희가 제공하는 서비스를 이용할 수 없습니다.
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
        // isInActive={'false'}
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