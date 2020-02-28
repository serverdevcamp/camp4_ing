import React from 'react';
import styles from '../components/PaymentResultView/PaymentResultView.scss';
import className from 'classnames/bind';
import CustomButton from '../components/Common/CustomButton';

const cx = className.bind(styles);

const PaymentResultView = ({ history }) => {

  const handleMain = () => {
    history.push(`/`);
  }
  return (
    <div className={cx('payment-result-page')}>
      <div className={cx('payment-result')}>
        <div className={cx('payment-title')}>결제가 완료 됐습니다.</div>
        <div className={cx('payment-sub-title')}>지정된 시간에 러너들이 세탁물을 수거해갈거예요.</div>
        <CustomButton
          type={'button'}
          className={'payment-result-button'}
          value={'처음 화면으로'}
          onClick={handleMain}

        />
      </div>
    </div>
  )
}

export default PaymentResultView;