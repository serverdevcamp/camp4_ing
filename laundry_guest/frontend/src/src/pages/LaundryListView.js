import React from 'react';
import styles from '../components/LaundryListView/LaundryListView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import Menu from '../components/Common/Menu';
import Laundry from '../components/LaundryListView/Laundry';
import { Link } from "react-router-dom";


const cx = className.bind(styles);

const distanceData = [
  {
    id: 1,
    name: '스마일 세탁소',
    content: '안녕하세요 스마일 세탁소 입니다.'
  },
  {
    id: 2,
    name: '게이트 세탁소',
    content: '안녕하세요 게이트 세탁소 입니다.'
  },
  {
    id: 3,
    name: '스마일 세탁소',
    content: '안녕하세요 스마일 세탁소 입니다.'
  },
  {
    id: 4,
    name: '게이트 세탁소',
    content: '안녕하세요 게이트 세탁소 입니다.'
  }
];

const ratingData = [
  {
    id: 1,
    name: '평점 순 스마일 세탁소',
    content: '안녕하세요 스마일 세탁소 입니다.'
  },
  {
    id: 2,
    name: '게이트 세탁소',
    content: '안녕하세요 게이트 세탁소 입니다.'
  },
  {
    id: 3,
    name: '스마일 세탁소',
    content: '안녕하세요 스마일 세탁소 입니다.'
  },
  {
    id: 4,
    name: '게이트 세탁소',
    content: '안녕하세요 게이트 세탁소 입니다.'
  }
];

const distanceLaundrys = distanceData.map(item => {
  return (
    <Laundry className={cx('laundry-item')} key={item.id} id={item.id} name={item.name} content={item.content} />
  )
})


const ratingLaundrys = ratingData.map(item => {
  return (
    <Laundry className={cx('laundry-item')} key={item.id} name={item.name} content={item.content} />
  )
})



class LaundryListView extends React.Component {


  render() {

    const handleMain = () => {
      window.location.href = '/';
    }

    return (
      <div className={cx('laundry-list-page')} >
        <Header name={"세탁소 목록"} handle={handleMain} />
        <Menu
          distanceLaundrys={distanceLaundrys}
          ratingLaundrys={ratingLaundrys}
        >
        </Menu>
      </div>
    )
  }
}

export default LaundryListView;