import React, { useState, useEffect } from 'react';
import styles from './LaundryItemModal.scss';
import classNames from 'classnames';
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Input from '../Common/Input';
import CustomButton from '../Common/CustomButton';


const cx = classNames.bind(styles);

const LaundryItemModal = ({ isOpen, setIsOpenedModal, onClick, clickedLaundryItem, orderItems, setOrderItems, setOrderItemsInBasket }) => {
  const [count, setCount] = useState(1);
  const [requirement, setRequirement] = useState('');

  const validatedSetCount = () => {
    if (count > 0)
      setCount(count => count - 1);
  }

  const addShoppingBasket = () => {
    // orderItems 를 state 로 관리하는 부분
    orderItems.forEach((orderItem, index) => {
      if (orderItem.clickedLaundryItem === clickedLaundryItem)
        orderItems.splice(index, 1);
    });
    orderItems.push({
      clickedLaundryItem,
      requirement,
      count
    });

    setOrderItemsInBasket();
    setIsOpenedModal(false);
    setCount(1);
  }

  useEffect(() => {
    console.log(orderItems);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      className={cx('item-add-modal')}
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
      <div className={cx('close-button')} onClick={onClick}>
        <CloseIcon />
      </div>
      <div className={cx('modal-content')}>
        <div className={cx('item-wrapper')}>
          <div className={cx('item-title')}>선택한 세탁물</div>
          <Input
            className={'item-input'}
            type={'text'}
            readOnly={true}
            value={clickedLaundryItem}
          />
        </div>
        <div className={cx('item-wrapper')}>
          <div className={cx('item-title')}>요청사항</div>
          <Input
            className={'item-input'}
            type={'text'}
            onChangeEvent={e => setRequirement(e.target.value)}
          />
        </div>
        <div className={cx('count-wrapper')}>
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
        onClick={addShoppingBasket}
      />
    </Modal >
  )
}

export default LaundryItemModal;
