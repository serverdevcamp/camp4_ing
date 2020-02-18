import React, { useState, useEffect } from 'react';
import styles from '../components/LaundryListView/LaundryListView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import Menu from '../components/Common/Menu';
import Laundry from '../components/LaundryListView/Laundry';
import axios from 'axios';
import EndPoint from '../config/EndPoint';


const cx = className.bind(styles);

const LaundryListView = ({ match, history }) => {

  const [laundrys, setLaundrys] = useState([]);

  const getLaudrys = () => {
    axios.get(`${EndPoint.laundryServer}/laundry/`)
      .then(response => {
        if (response.data.response === 'success') {
          console.log(response.data.data);
          setLaundrys(response.data.data);
        }
        else {
          console.error(response);
        }
      })
  }

  const leftComponent = laundrys.map(({ id, name, information, grade, like_num }) => {
    return (
      <Laundry
        className={cx('laundry-item')}
        key={id}
        id={id}
        name={name}
        content={information}
        grade={grade}
        likeNum={like_num}
        match={match}
      />
    )
  })


  const rightComponent = laundrys.map(({ id, name, information, grade, like_num }) => {
    return (
      <Laundry
        className={cx('laundry-item')}
        key={id}
        id={id}
        name={name}
        content={information}
        grade={grade}
        likeNum={like_num}
        match={match}
      />
    )
  })

  useEffect(() => {
    getLaudrys();
  }, []);

  return (
    <div className={cx('laundry-list-page')} >
      <Header name={"세탁소 목록"} history={history} />
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

export default LaundryListView;