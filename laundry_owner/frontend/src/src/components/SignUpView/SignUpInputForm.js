import React from 'react';
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


class SignUpInputForm extends React.Component {

    detailedAddress = React.createRef();

    state = {
        isOpenedModal: false,
        address: '',

        dayMon: false,
        dayTue: false,
        dayWed: false,
        dayThr: false,
        dayFri: false,
        daySat: false,
        daySun: false,

        openTime: new Date('2020-02-20T06:30:00'),
        closeTime: new Date('2019-08-18T22:00:00'),

        operationList: [{
            id: 1,
            days: ['월', '화'],
            openTime: "10:30",
            closeTime: "22:30"
        },
            {
                id: 2,
                days: ['목', '토'],
                openTime: "10:30",
                closeTime: "22:30"
            },
            {
                id: 3,
                days: ['금', '목'],
                openTime: "10:30",
                closeTime: "22:30"
            }, {
                id: 4,
                days: ['월', '화'],
                openTime: "10:30",
                closeTime: "22:30"
            }]
    };

    render() {

        const {dayMon, dayTue, dayWed, dayThr, dayFri, daySat, daySun} = this.state;
        const {openTime, closeTime} = this.state;
        const {operationList} = this.state;

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

        return (
            <div className={cx('signUpInput')}>
                <form className={cx('signUpForm')}>
                <span className={cx('signUpRowItem')}>
                    사업자 번호
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                            className={cx('signUpBigInput')}
                            type='text'
                            required={true}/>
                    </span>
                </span>

                    <span className={cx('signUpRowItem')}>
                    사업장 이름
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                            className={cx('signUpBigInput')}
                            type='text'
                            required={true}/>
                    </span>
                </span>

                    <span className={cx('signUpRowItem')}>
                    아이디
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                            className={cx('signUpIdInput')}
                            type='text'
                            required={true}/>

                        <CustomButton
                            className={cx('signUpIdCheckButton')}
                            type={'button'}
                            value='중복검사'/>
                    </span>
                </span>

                    <span className={cx('signUpRowItem')}>
                    비밀번호
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                            className={cx('signUpBigInput')}
                            type='password'
                            required={true}/>
                    </span>
                </span>

                    <span className={cx('signUpRowItem')}>
                    비밀번호 확인
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                            className={cx('signUpBigInput')}
                            type='password'
                            required={true}/>
                    </span>
                </span>

                    <span className={cx('signUpRowItem')}>
                    이름
                   <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                            className={cx('signUpBigInput')}
                            type='text'
                            required={true}/>
                    </span>
                </span>

                    <span className={cx('signUpRowItem')}>
                    이메일
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                            className={cx('signUpBigInput')}
                            type='email'
                            required={true}/>
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
                            value={this.state.address}
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
                            reference={this.detailedAddress}
                        />
                    </span>
                </span>

                    <span className={cx('signUpRowItem')}>
                    전화번호
                    <span className={cx('signUpSpaceBetween')}>
                        <CustomInput
                            className={cx('signUpBigInput')}
                            type='text'
                            required={true}/>
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
                                value={'회원가입'}
                                className={cx('signUpIdCheckButton')}/>
                        </span>
                    </span>

                </form>

                <Modal
                    isOpen={this.state.isOpenedModal}
                    className={cx('signUpPostModal')}
                >

                    <span className={cx('closeBtn')} onClick={onToggleModal}>닫기</span>
                    <DaumPostcode onComplete={data => onClickAddress(data)}/>

                </Modal>

            </div>
        )
    }

}

Modal.setAppElement('#root');

export default SignUpInputForm;