import React from "react";
import className from 'classnames';
import style from './ShopMenu.scss';
import {List,ListItem} from "@material-ui/core";

const cx = className.bind(style);

const ShopMenu = ({menuIndex}) =>{
    return(
        <div>
            <div className={cx('shopMenuTitle')}>
                세탁소 관리
            </div>
            <List className={cx('shopMenuList')}>
                <ListItem
                    alignItems={"center"}
                    button
                    selected={menuIndex===1}
                >
                    정보 수정
                </ListItem>
                <ListItem
                    button
                    alignItems={"center"}
                    selected={menuIndex===2}
                >
                    제품 등록
                </ListItem>
                <ListItem
                    button
                    selected={menuIndex===3}
                >
                    리뷰 관리
                </ListItem>
            </List>
            <div className={cx('shopMenuTitle')}>
                통계
            </div>
            <List>
                <ListItem
                    button
                    selected={menuIndex===4}
                >
                    시간별 매출
                </ListItem>
                <ListItem
                    button
                    selected={menuIndex===5}
                >
                    시간별 주문량
                </ListItem>
                <ListItem
                    button
                    selected={menuIndex===6}
                >
                    위치별 매출
                </ListItem>
                <ListItem
                    button
                    selected={menuIndex===7}
                >
                    위치별 주문량
                </ListItem>
            </List>
        </div>

    )
};

export default ShopMenu;