import React from 'react';
import styles from '../components/LaundryListView/LaundryListView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';

const cx = className.bind(styles);

class LaundryListView extends React.Component {
  render() {
    return (
      <div className={cx('laundry-list-page')}>
        <Header name={"세탁소 목록"} />
      </div>

    )
  }
}

export default LaundryListView;