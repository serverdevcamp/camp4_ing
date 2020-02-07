import React from "react";
import style from './ProfileModificationForm.scss';
import className from 'classnames';
import CustomButton from "../Common/CustomButton";
import CustomInput from "../Common/Input";
import SignUpCheckBox from "../SignUpView/SignUpCheckBox";
import {KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import SignUpOperationList from "../SignUpView/SignUpOperationList";


const cx = className.bind(style);

class ProfileModificationForm extends React.Component {

    state = {
        dayMon: false,
        dayTue: false,
        dayWed: false,
        dayThr: false,
        dayFri: false,
        daySat: false,
        daySun: false,

        openTime: new Date('2020-02-20T06:30:00'),
        closeTime: new Date('2019-08-18T22:00:00'),

        operationList : []
    };


    render() {

        const {dayMon, dayTue, dayWed, dayThr, dayFri, daySat, daySun} = this.state;
        const {openTime, closeTime} = this.state;
        const {operationList} = this.state;

        const onToggleMonDay = () => {
            this.setState({
                dayMon: !dayMon
            });
        };

        const onToggleTueDay = () => {
            this.setState({
                dayTue: !dayTue
            });
        };
        const onToggleWedDay = () => {
            this.setState({
                dayWed: !dayWed
            });
        };
        const onToggleThrDay = () => {
            this.setState({
                dayThr: !dayThr
            });
        };
        const onToggleFriDay = () => {
            this.setState({
                dayFri: !dayFri
            });
        };
        const onToggleSatDay = () => {
            this.setState({
                daySat: !daySat
            });
        };
        const onToggleSunDay = () => {
            this.setState({
                daySun: !daySun
            });
        };

        const addOperationListItem = () => {
            let id = operationList.length + 1;
            const days = [];
            const parsedOpenTime = `${('0'+openTime.getHours()).slice(-2)} : 
                                    ${('0'+openTime.getMinutes()).slice(-2)} `;
            const parsedCloseTime = `${(('0')+closeTime.getHours()).slice(-2)} :
                                     ${('0'+closeTime.getMinutes()).slice(-2)} `;

            if (dayMon) days.push('월');
            if (dayTue) days.push('화');
            if (dayWed) days.push('수');
            if (dayThr) days.push('목');
            if (dayFri) days.push('금');
            if (daySat) days.push('토');
            if (daySun) days.push('일');

            this.setState({
                operationList: [...operationList,
                    {
                        id: id,
                        days: days,
                        openTime: parsedOpenTime,
                        closeTime: parsedCloseTime
                    }]
            });


            this.setState({
                openTime: new Date('2020-02-20T06:30:00'),
                closeTime: new Date('2020-02-20T22:00:00')
            });


            this.setState({
                dayMon: false,
                dayTue: false,
                dayWed: false,
                dayThr: false,
                dayFri: false,
                daySat: false,
                daySun: false
            });

        };

        const onChangeOpenTime = (time) => {
            console.log(time);
            this.setState({
                openTime: time
            })
        };


        const onChangeCloseTime = (time) => {
            this.setState({
                closeTime: time
            })
        };


        return(
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
                            required={true}
                            reference={this.detailedAddress}
                        />
                    </span>
                </span>

                <span className={cx('ProfileModification-rowItem')}>
                    전화번호
                    <span className={cx('ProfileModification-spaceBetween')}>
                        <CustomInput
                            className={cx('ProfileModification-bigInput')}
                        />
                    </span>
                </span>

                <span className={cx('signUpRowItem')}>
                    소개글
                    <span className={cx('signUpSpaceBetween')}>
                        <textarea className={cx('signUpTextArea')}/>
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
                            <SignUpOperationList list={this.state.operationList}/>
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
                                value={'정보 수정'}
                                className={cx('signUpIdCheckButton')}/>
                        </span>
                    </span>

            </div>
        )
    }
}

export default ProfileModificationForm;