import React from 'react';
import styles from '../components/PaymentView/PaymentView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import AddressInput from '../components/PaymentView/AddressInput';
import CustomInput from '../components/Common/Input';
import CustomButton from '../components/Common/CustomButton';

const cx = className.bind(styles);

class PaymentView extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div className={cx('payment-page')}>
        <Header
          className={'payment-header'}
          name={'주문정보'}
          history={history}
        />
        <AddressInput
          name={'수거주소'}
        />
        <AddressInput
          name={'배달주소'}
        />
        <div className={cx('item-wrapper')}>
          <div className={cx('item-name')}>요청사항</div>
          <CustomInput
            className={cx('inputText')}
            type={'text'}
            placeHolder={'ex) 부재 시 경비실에 맡겨주세요.'}
          />
        </div>
        <div className={cx('item-wrapper')}>
          <div className={cx('item-name')}>결제금액</div>
          <div className={cx('total-price')}>15,000원</div>
          <div className={cx('detail-price')}>주문 금액 15,000원 + 배달팁 3,000원</div>
        </div>
        <CustomButton
          type={'button'}
          className={'payment-button'}
          value={'결제하기'}
          isInActive={true}
        />
      </div>
    )
  }
}

export default PaymentView;