import React, {useRef, createRef, useState} from 'react';
import Modal from 'react-modal';
import {MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DaumPostcode from "react-daum-postcode";
import styles from "./SignUpInputForm.scss";
import CustomInput from "../Common/Input";
import CustomButton from "../Common/CustomButton";
import SignUpCheckBox from "./SignUpCheckBox";
import SignUpOperationList from "./SignUpOperationList";
import className from 'classnames';

const cx = className.bind(styles);

const SignUpInputForm = ({
                           businessNum, shopName, userName, password, operationTimes,
                           passwordConfirm, name, email, image, address, detailAddress,
                           tel, information, onChangeBusinessNum, onChangeShopName, onChangeUserName,
                           onChangePassword, onChangePasswordConfirm, onChangeName, onChangeEmail, onChangeImage,
                           onChangeAddress, onChangeDetailAddress, onChangeTel,
                           onChangeInformation, addOperationTime, detailAddressRef,
                           handleSignUp, checkDuplicate
                         }) => {

  const [isOpenedModal, setOpenModal] = useState(false);
  const [dayMon, setDayMon] = useState(false);
  const [dayTue, setDayTue] = useState(false);
  const [dayWed, setDayWed] = useState(false);
  const [dayThr, setDayThr] = useState(false);
  const [dayFri, setDayFri] = useState(false);
  const [daySat, setDaySat] = useState(false);
  const [daySun, setDaySun] = useState(false);
  const [openTime, setOpenTime] = useState(new Date('2020-02-20T06:30:00'));
  const [closeTime, setCloseTime] = useState(new Date('2020-02-20T22:00:00'));

  //
  // operationList: [{
  //   id: 1,
  //   days: ['월', '화'],
  //   openTime: "10:30",
  //   closeTime: "22:30"
  // },
  //   {
  //     id: 2,
  //     days: ['목', '토'],
  //     openTime: "10:30",
  //     closeTime: "22:30"
  //   },
  //   {
  //     id: 3,
  //     days: ['금', '목'],
  //     openTime: "10:30",
  //     closeTime: "22:30"
  //   }, {
  //     id: 4,
  //     days: ['월', '화'],
  //     openTime: "10:30",
  //     closeTime: "22:30"
  //   }]

  const onToggleModal = () => {
    setOpenModal(!isOpenedModal);
  };

  const onClickAddress = (objAddress) => {
    onChangeAddress(objAddress.address);
    onToggleModal();
    detailAddressRef.current.focus();
  };

  const onToggleMonDay = () => {
    setDayMon(!dayMon)
  };

  const onToggleTueDay = () => {
    setDayTue(!dayTue);
  };
  const onToggleWedDay = () => {
    setDayWed(!dayWed);
  };

  const onToggleThrDay = () => {
    setDayThr(!dayThr);
  };

  const onToggleFriDay = () => {
    setDayFri(!dayFri);
  };

  const onToggleSatDay = () => {
    setDaySat(!daySat);
  };

  const onToggleSunDay = () => {
    setDaySun(!daySun);
  };

  const onChangeOpenTime = (time) => {
    setOpenTime(time);
  };


  const onChangeCloseTime = (time) => {
    setCloseTime(time);
  };

  const addOperationListItem = () => {
    let id = operationTimes.length + 1;
    const days = [];
    const parsedOpenTime = `${('0' + openTime.getHours()).slice(-2)} : 
                                    ${('0' + openTime.getMinutes()).slice(-2)} `;
    const parsedCloseTime = `${(('0') + closeTime.getHours()).slice(-2)} :
                                     ${('0' + closeTime.getMinutes()).slice(-2)} `;

    if (dayMon) days.push('월');
    if (dayTue) days.push('화');
    if (dayWed) days.push('수');
    if (dayThr) days.push('목');
    if (dayFri) days.push('금');
    if (daySat) days.push('토');
    if (daySun) days.push('일');

    addOperationTime({
      id: id,
      days: days,
      openTime: parsedOpenTime,
      closeTime: parsedCloseTime
    });

    setOpenTime(new Date('2020-02-20T06:30:00'));
    setCloseTime(new Date('2020-02-20T22:00:00'));

    setDayMon(false);
    setDayTue(false);
    setDayWed(false);
    setDayThr(false);
    setDayFri(false);
    setDaySat(false);
    setDaySun(false);

  };

  return (
    <div className={cx('signUpInput')}>
      <form className={cx('signUpForm')} onSubmit={handleSignUp} action={"#"}>
                <span className={cx('signUpRowItem')}>
                    사업자 번호
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpBigInput')}
                          type='text'
                          required={true}
                          value={businessNum}
                          onChangeEvent={onChangeBusinessNum}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    사업장 이름
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpBigInput')}
                          type='text'
                          required={true}
                          value={shopName}
                          onChangeEvent={onChangeShopName}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    아이디
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpIdInput')}
                          type='text'
                          required={true}
                          value={userName}
                          onChangeEvent={onChangeUserName}
                        />

                        <CustomButton
                          className={cx('signUpIdCheckButton')}
                          type={'button'}
                          value='중복검사'
                          onClick={()=>checkDuplicate(userName)}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    비밀번호
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpBigInput')}
                          type='password'
                          required={true}
                          value={password}
                          onChangeEvent={onChangePassword}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    비밀번호 확인
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpBigInput')}
                          type='password'
                          required={true}
                          value={passwordConfirm}
                          onChangeEvent={onChangePasswordConfirm}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    이름
                   <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpBigInput')}
                          type='text'
                          required={true}
                          value={name}
                          onChangeEvent={onChangeName}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    이메일
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpBigInput')}
                          type='email'
                          required={true}
                          value={email}
                          onChangeEvent={onChangeEmail}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    이미지
                     <span className={cx('signUpSpaceBetween')}>
                         <input type={'file'} className={cx('signUpImgInput')}/>
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    주소
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpIdInput')}
                          type='text'
                          placeHolder={"도로명 주소"}
                          value={address}
                          required={true}
                          readOnly={true}
                        />
                        <CustomButton
                          className={cx('signUpIdCheckButton')}
                          type={'button'}
                          onClick={onToggleModal}
                          value='검색'/>
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    <p></p> {/* 공백 : 상세주소 */}
          <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpBigInput')}
                          type='text'
                          placeHolder={'상세 주소'}
                          required={true}
                          value={detailAddress}
                          reference={detailAddressRef}
                          onChangeEvent={onChangeDetailAddress}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    전화번호
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                          className={cx('signUpBigInput')}
                          type='text'
                          required={true}
                          value={tel}
                          onChangeEvent={onChangeTel}
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    소개글
                    <span className={cx('signUpSpaceBetween')}>
                        <textarea
                          className={cx('signUpTextArea')}
                          value={information}
                          onChange={
                            (e) =>
                              onChangeInformation(e.target.value)
                          }
                        />
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    영업정보
                    <span className={cx('signUpSpaceBetween')}>
                        <SignUpCheckBox value={'월'} isClicked={dayMon} onClick={onToggleMonDay}/>
                        <SignUpCheckBox value={'화'} isClicked={dayTue} onClick={onToggleTueDay}/>
                        <SignUpCheckBox value={'수'} isClicked={dayWed} onClick={onToggleWedDay}/>
                        <SignUpCheckBox value={'목'} isClicked={dayThr} onClick={onToggleThrDay}/>
                        <SignUpCheckBox value={'금'} isClicked={dayFri} onClick={onToggleFriDay}/>
                        <SignUpCheckBox value={'토'} isClicked={daySat} onClick={onToggleSatDay}/>
                        <SignUpCheckBox value={'일'} isClicked={daySun} onClick={onToggleSunDay}/>
                    </span>
                </span>

        <span className={cx('signUpRowItem')}>
                    <p></p>
                        <span className={cx('signUpSpaceBetween')}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                  margin={"normal"}
                                  label={"개점 시간"}
                                  value={openTime}
                                  onChange={onChangeOpenTime}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                  }}
                                />

                            <KeyboardTimePicker
                              margin={"normal"}
                              label={"폐점 시간"}
                              value={closeTime}
                              onChange={onChangeCloseTime}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                            />
                            </MuiPickersUtilsProvider>
                            <p></p>
                        </span>
                    </span>

        <span className={cx('signUpRowItem')}>
                    <p></p>
                        <span className={cx('signUpFlexEnd')}>
                            <CustomButton
                              value={'추가하기'}
                              className={cx('signUpIdCheckButton')}
                              onClick={addOperationListItem}
                            />
                        </span>
                    </span>

        <span className={cx('signUpRowItem')}>
                    <p></p>
                        <span className={cx('signUpSpaceBetween')}>
                            <SignUpOperationList list={operationTimes}/>
                        </span>
                    </span>

        <span className={cx('signUpRowItem')}>
                        <div className={cx('signUpDivider')}></div>
                    </span>

        <span className={cx('signUpRowItem')}>
                    <p></p>
                        <span className={cx('signUpFlexEnd')}>
                            <CustomButton
                              type={'submit'}
                              value={'회원가입'}
                              className={cx('signUpIdCheckButton')}/>
                        </span>
                    </span>

      </form>

      <Modal
        isOpen={isOpenedModal}
        className={cx('signUpPostModal')}
      >

        <span className={cx('closeBtn')} onClick={onToggleModal}>닫기</span>
        <DaumPostcode onComplete={data => onClickAddress(data)}/>

      </Modal>

    </div>
  )
};


Modal.setAppElement('#root');

export default SignUpInputForm;