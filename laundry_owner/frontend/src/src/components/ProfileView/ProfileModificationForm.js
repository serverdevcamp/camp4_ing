import React, {useRef, useState} from "react";
import style from './ProfileModificationForm.scss';
import className from 'classnames';
import CustomButton from "../Common/CustomButton";
import CustomInput from "../Common/Input";
import SignUpCheckBox from "../SignUpView/SignUpCheckBox";
import {KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import SignUpOperationList from "../SignUpView/SignUpOperationList";


const cx = className.bind(style);

const ProfileModificationForm = ({
                                   name, address, detailAddress, tel, information, operatingTime,
                                   setName, setAddress, setDetailAddress, setTel, setInformation, setOperatingTime,
                                   modifyProfile
                                 }) => {

  const [dayMon, setDayMon] = useState(false);
  const [dayTue, setDayTue] = useState(false);
  const [dayWed, setDayWed] = useState(false);
  const [dayThr, setDayThr] = useState(false);
  const [dayFri, setDayFri] = useState(false);
  const [daySat, setDaySat] = useState(false);
  const [daySun, setDaySun] = useState(false);

  const [openTime, setOpenTime] = useState(new Date('2020-02-20T06:30:00'));
  const [closeTime, setCloseTime] = useState(new Date('2019-08-18T22:00:00'));


  const detailAddressRef = useRef();


  const onToggleMonDay = () => {
    setDayMon(!dayMon);
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

  const addOperationListItem = () => {
    let id = operatingTime.length + 1;
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

    setOperatingTime(
      [...operatingTime,
        {
          id: id,
          days: days,
          openTime: parsedOpenTime,
          closeTime: parsedCloseTime
        }]
    );

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

  const onChangeOpenTime = (time) => {
    setOpenTime(time);
  };


  const onChangeCloseTime = (time) => {
    setCloseTime(time);
  };


  return (
    <div className={cx('ProfileModification-form')}>
      <span className={cx('ProfileModification-rowItem')}>
        비밀번호
        <span className={cx('ProfileModification-bigInput')}>
          <CustomButton
            className={cx('ProfileModification-button')}
            value={"변경"}
          />
        </span>
      </span>

      <span className={cx('ProfileModification-rowItem')}>
        이름
        <span className={cx('ProfileModification-spaceBetween')}>
          <CustomInput
            className={cx('ProfileModification-bigInput')}
            value={name}
            onChangeEvent={setName}
          />
        </span>
      </span>

      <span className={cx('ProfileModification-rowItem')}>
        이미지
        <span className={cx('ProfileModification-spaceBetween')}>
          <input type={'file'} className={cx('ProfileModification-imgInput')}/>
        </span>
      </span>

      <span className={cx('ProfileModification-rowItem')}>
        주소
        <span className={cx('ProfileModification-spaceBetween')}>
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
            value='검색'/>
        </span>
      </span>

      <span className={cx('ProfileModification-rowItem')}>
                    <p></p> {/* 공백 : 상세주소 */}
        <span className={cx('ProfileModification-spaceBetween')}>
          <CustomInput
            className={cx('ProfileModification-bigInput')}
            type='text'
            placeHolder={'상세 주소'}
            value={detailAddress}
            onChangeEvent={setDetailAddress}
            required={true}
            reference={detailAddressRef}
          />
        </span>
      </span>

      <span className={cx('ProfileModification-rowItem')}>
        전화번호
        <span className={cx('ProfileModification-spaceBetween')}>
          <CustomInput
            type={'tel'}
            className={cx('ProfileModification-bigInput')}
            onChangeEvent={setTel}
            value={tel}
          />
        </span>
      </span>

      <span className={cx('signUpRowItem')}>
        소개글
        <span className={cx('signUpSpaceBetween')}>
          <textarea
            className={cx('signUpTextArea')}
            value={information}
            onChange={(e) => setInformation(e.target.value)}
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
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              value={openTime}
              onChange={onChangeOpenTime}
            />

            <KeyboardTimePicker
              margin={"normal"}
              label={"폐점 시간"}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              value={closeTime}
              onChange={onChangeCloseTime}
            />
          </MuiPickersUtilsProvider>
          <p></p>
        </span>
      </span>

      <span className={cx('signUpRowItem')}>
        <p></p>
        <span className={cx('signUpFlexEnd')}>
          <CustomButton
            type={'button'}
            value={'추가'}
            className={cx('signUpIdCheckButton')}
            onClick={addOperationListItem}
          />
        </span>
      </span>

      <span className={cx('signUpRowItem')}>
        <p></p>
        <span className={cx('signUpSpaceBetween')}>
          <SignUpOperationList list={operatingTime}/>
        </span>
      </span>

      <span className={cx('signUpRowItem')}>
        <div className={cx('signUpDivider')}></div>
      </span>

      <span className={cx('signUpRowItem')}>
        <p></p>
        <span className={cx('signUpFlexEnd')}>
          <CustomButton
            type={'button'}
            value={'정보 수정'}
            className={cx('signUpIdCheckButton')}
            onClick={modifyProfile}
          />
        </span>
      </span>

    </div>
  )

};

export default ProfileModificationForm;