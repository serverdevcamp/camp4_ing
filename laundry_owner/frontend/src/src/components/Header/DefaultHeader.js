import React from "react";
import className from "classnames";
import style from './DefaultHeader.scss';
import ToggleSwitch from "../Common/ToggleSwitch";
import {Link} from "react-router-dom";

const cx = className.bind(style);
const DefaultHeader = ({title}) =>{

    return(
        <div className={cx('defaultHeader')}>
            <div className={cx('defaultHeaderTitleDiv')}>
                <span className={cx('defaultHeaderTitle')}>
                LaundryRunner
            </span>
                <span className={cx('defaultHeaderSubTitle')}>
                {title}
            </span>
            </div>

            <div className={cx('defaultHeaderProfileDiv')}>
                <div>Off <ToggleSwitch/> On <Link class to={"#"}> 로그아웃</Link> </div>
                <div><span>누구누구</span>님 오늘도 환영합니다 :)</div>
            </div>
        </div>
    );
};

export default DefaultHeader;