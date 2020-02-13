import React from 'react';
import styles from '../components/PaymentView/PaymentView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import AddressInput from '../components/PaymentView/AddressInput'

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
      </div>
    )
  }
}

export default PaymentView;