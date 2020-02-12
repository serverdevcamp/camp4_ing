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

class LaundryListView extends React.Component {


  render() {
    const { match } = this.props;

    const leftComponent = distanceData.map(({ id, name, content }) => {
      return (
        <Laundry
          className={cx('laundry-item')}
          key={id}
          id={id}
          name={name}
          content={content}
          match={match}
        />
      )
    })


    const rightComponent = ratingData.map(({ id, name, content }) => {
      return (
        <Laundry
          className={cx('laundry-item')}
          key={id}
          id={id}
          name={name}
          content={content}
          match={match}
        />
      )
    })


    const handleMain = () => {
      window.location.href = '/';
    }

    return (
      <div className={cx('laundry-list-page')} >
        <Header name={"세탁소 목록"} handle={handleMain} />
        <Menu
          leftLabel={'거리순'}
          rightLabel={'평점순'}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        >
        </Menu>
      </div>
    )
  }
}

export default LaundryListView;