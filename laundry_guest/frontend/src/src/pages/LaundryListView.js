import React from 'react';
import styles from '../components/LaundryListView/LaundryListView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import Menu from '../components/Common/Menu';
import Laundry from '../components/LaundryListView/Laundry'


const cx = className.bind(styles);

class LaundryListView extends React.Component {
  render() {
    return (
      <div className={cx('laundry-list-page')}>
        <Header name={"세탁소 목록"} />
        <Menu>
          <Laundry name={'스마일 세탁소'} content={'안녕하세요 스마일 세탁소 입니다.'} />
          <Laundry name={'게이트 세탁소'} content={'안녕하세요 게이트 세탁소 입니다.'} />
        </Menu>

      </div>

    )
  }
}

export default LaundryListView;