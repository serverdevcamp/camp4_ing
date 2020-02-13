import React, { useState } from 'react';
import styles from './LaundryItemModal.scss';
import classNames from 'classnames';
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Input from '../Common/Input';
import CustomButton from '../Common/CustomButton';


const cx = classNames.bind(styles);

const LaundryItemModal = ({ isOpen, onClick }) => {
  const [count, setCount] = useState(1);

  const validatedSetCount = () => {
    if (count > 0)
      setCount(count => count - 1);
  }
  return (
    <Modal
      isOpen={isOpen}
      className={cx('item-add-modal')}
    >
      <div className={cx('close-button')} onClick={onClick}>
        <CloseIcon />
      </div>
      <div className={cx('modal-content')}>
        <div className={cx('item-wapper')}>
          <div className={cx('item-title')}>선택한 세탁물</div>
          <Input
            className={'item-input'}
            type={'text'}
            readOnly={true}
          />
        </div>
        <div className={cx('item-wapper')}>
          <div className={cx('item-title')}>요청사항</div>
          <Input
            className={'item-input'}
            type={'text'}
          />
        </div>
        <div className={cx('count-wapper')}>
          <div onClick={() => validatedSetCount(count - 1)}>
            <RemoveCircleOutlineIcon />
          </div>
          <div className={cx('count')}>{count}</div>
          <div onClick={() => setCount(count + 1)}>
            <ControlPointIcon />
          </div>
        </div>
      </div>
      <CustomButton
        type={'button'}
        className={'add-item-button'}
        value={'장바구니 담기'}
      />
    </Modal >
  )
}

export default LaundryItemModal;
