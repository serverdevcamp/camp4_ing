import React, { useState } from 'react';
import styles from './AddressInput.scss';
import className from 'classnames/bind';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import CloseIcon from '@material-ui/icons/Close';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';

const cx = className.bind(styles);



const AddressInput = ({ name, }) => {

    let detailedAddress = React.createRef();
    console.log(detailedAddress);

    const [isOpenedModal, setisOpenedModal] = useState(false);
    const [address, setAddress] = useState('');

    const onToggleModal = () => {
        setisOpenedModal(!isOpenedModal)
    }

    const onClickAddress = (objAddress) => {
        setAddress(objAddress.address);
        onToggleModal();
        console.log(detailedAddress.current);
        // TODO: ref 는 함수 컴포넌트에서 가상돔에 접근을 못한다. 
        // forwardRef 를 사용하던지 클래스형 컴프넌트로하자
        //detailedAddress.current.focus();
    }

    return (
        <div className={cx('address-input-wrapper')}>
            <div className={cx('address-name')}>{name}</div>
            <div className={cx('address-wrapper')}>
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
            <div className={cx('detail-address')}>
                <CustomInput
                    className={cx('inputText')}
                    type={'text'}
                    reference={detailedAddress}
                    placeHolder={'상세주소를 입력해주세요.'}
                    required={true}
                />
            </div>

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

export default AddressInput;