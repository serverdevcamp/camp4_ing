import React from "react";
import className from 'classnames';
import style from './ShopMenu.scss';
import {List, ListItem} from "@material-ui/core";
import {useHistory} from 'react-router';

const cx = className.bind(style);

const ShopMenu = ({menuIndex}) => {

  const history = useHistory();

  const navigatePage = (page) => {
    history.push(`/${page}`);
  };


  return (
    <div>
      <div className={cx('shopMenuTitle')}>
        세탁소 관리
      </div>
      <List className={cx('shopMenuList')}>
        <ListItem
          alignItems={"center"}
          button
          selected={menuIndex === 0}
          onClick={() => navigatePage("orderManagement")}
        >
          주문 관리
        </ListItem>
        <ListItem
          alignItems={"center"}
          button
          selected={menuIndex === 1}
          onClick={() => navigatePage("profile")}
        >
          정보 수정
        </ListItem>
        <ListItem
          button
          alignItems={"center"}
          selected={menuIndex === 2}
          onClick={() => navigatePage('productRegistration')}
        >
          제품 등록
        </ListItem>
        <ListItem
          button
          selected={menuIndex === 3}
          onClick={() => navigatePage('review')}
        >
          리뷰 관리
        </ListItem>
        <ListItem
          button
          selected={menuIndex === 4}
          onClick={() => navigatePage('chatList')}
        >
          채팅방 목록
        </ListItem>
      </List>
      <div className={cx('shopMenuTitle')}>
        통계
      </div>
      <List>
        <ListItem
          button
          selected={menuIndex === 5}
          onClick={() => navigatePage('hourlySales')}
        >
          시간별 매출
        </ListItem>
        <ListItem
          button
          selected={menuIndex === 6}
        >
          시간별 주문량
        </ListItem>
        <ListItem
          button
          selected={menuIndex === 7}
        >
          위치별 매출
        </ListItem>
        <ListItem
          button
          selected={menuIndex === 8}
        >
          위치별 주문량
        </ListItem>
      </List>
    </div>

  )
};

export default ShopMenu;