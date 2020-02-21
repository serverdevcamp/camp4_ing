import React, {useEffect, useState} from "react";
import className from "classnames";
import style from './DefaultHeader.scss';
import ToggleSwitch from "../Common/ToggleSwitch";
import {Typography} from "@material-ui/core";
import axios from 'axios';
import EndPoint from "../../config/EndPoint";
import {useHistory} from 'react-router';
import {useDispatch, useSelector} from "react-redux";
import {setShopId, setUserId} from "../../modules/profile";

const cx = className.bind(style);


const DefaultHeader = ({title}) => {

  const history = useHistory();
  const profile = useSelector(state=>state.profile);
  const dispatch = useDispatch();

  useEffect(()=>{

  },[]);

  const requestLogout = () => {
    const url = `${EndPoint.authServer}/myauth/logout`;
    axios.get(url,{
      withCredentials : true
    })
      .then(response=>{
        console.log(response);
        if(response.data.response !=='success'){
          alert('로그아웃 요청 중 오류가 발생했습니다.');
          return;
        }
        alert('성공적으로 로그아웃 됐습니다.');
        history.push('/');
        dispatch(setUserId(''));
        dispatch(setShopId(''));
      })
  };

  return (
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
        <div className={cx('defaultHeader-rowItem')}>
          Off <ToggleSwitch/> On
            <Typography
            style={{marginLeft:'15px', cursor: 'pointer', color: "#666666"}}
            variant={"button"}
            onClick={requestLogout}
            >로그아웃</Typography>
        </div>
        <div><span>누구누구</span>님 오늘도 환영합니다 :)</div>
      </div>
    </div>
  );
};

export default DefaultHeader;