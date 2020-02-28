import React, { useState, useEffect } from 'react';
import styles from '../components/LaundryListView/LaundryListView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header';
import Menu from '../components/Common/Menu';
import Laundry from '../components/LaundryListView/Laundry';
import axios from 'axios';
import laundryShopImg1 from '../static/image/laundryShop1.png';
import laundryShopImg2 from '../static/image/laundryShop3.png';
import laundryShopImg3 from '../static/image/laundryShop2.png';
import laundryShopImg4 from '../static/image/laundryShop4.png';
import laundryShopImg5 from '../static/image/laundryShop5.jpeg';
import laundryShopImg6 from '../static/image/laundryShop6.jpeg';


const cx = className.bind(styles);

const LaundryListView = ({ match, history }) => {

  const [laundrys, setLaundrys] = useState([]);

  const getLaudrys = () => {
    axios.get(`/laundry/`)
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
  const laundryShopImgList = [laundryShopImg1, laundryShopImg2, laundryShopImg3, laundryShopImg4, laundryShopImg5, laundryShopImg6]
  const leftComponent = laundrys.map(({ id, name, information, grade, like_num }, index) => {
    console.log(index);
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
        laundryShopImg={laundryShopImgList[index]}
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