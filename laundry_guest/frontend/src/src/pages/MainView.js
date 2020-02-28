import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { useSelector } from "react-redux";
import className from "classnames/bind";
import styles from "../components/MainView/MainView.scss";
import MenuItem from '../components/MainView/MenuItem'
import EndPoint from '../config/EndPoint';
import { Link } from "react-router-dom";



const cx = className.bind(styles);

const MainView = ({ }) => {

  const [laundrys, setLaundrys] = useState([]);
  const [searchedLaundry, setSearchedLaundry] = useState('');
  const { username } = useSelector(state => state.profile, []);
  const getLaudrys = () => {

    axios.get(`/laundry/`)
      .then(response => {
        if (response.data.response === 'success') {
          setLaundrys(response.data.data);
        }
        else {
          console.log(response);
        }
      })
  }

  const handleLaundryList = () => {
    window.location.href = "/laundrylist";
  }

  const handleLogout = () => {
    axios.get(`/myauth/logout/`,
      { withCredentials: true })
      .then(response => {
        if (response.data.response) {
          alert('로그아웃 성공');
          window.location.href = '/login'
        }
      });
  }

  const searchLaundry = () => {
    axios.get(`/laundry/laundry_search/${searchedLaundry}`)
      .then(response => {
        if (response.data.response === 'success') {
          window.location.href = `/laundrylist/${response.data.data}`
        }
        else {
          console.error("데이터 조회 실패");
        }
      })
  }

  useEffect(() => {
    getLaudrys();
  }, []);

  return (
    <div className={cx("main-page")}>
      <div className={cx("header")}>
        <div className={cx("header-content")}>
          <div className={cx("greeting")}>{username} 고객님 환영합니다. :)</div>
          <div className={cx("logout")} onClick={handleLogout}>로그아웃</div>
        </div>
      </div>
      <div className={cx("advertising")}>광고 캐러셀</div>
      <div className={cx("search-wrapper")}>
        <Autocomplete
          autoComplete={true}
          id="combo-box-demo"
          options={laundrys}
          getOptionLabel={option => option.name}
          onChange={(event, value) => {
            setSearchedLaundry(value.name);
          }}
          style={{
            width: 285,
            background: 'white'
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="세탁소 검색"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <div className={cx("search-icon")} onClick={searchLaundry}>
          <SearchIcon fontSize="large" />
        </div>
      </div>
      <div className={cx("menu-list")}>
        <MenuItem name={"회원정보"} />
        <MenuItem name={"주문내역"} />
        <MenuItem name={"세탁소 목록"} onClick={handleLaundryList} />
        <MenuItem name={"리뷰 조회"} />
        <MenuItem name={"채팅"} />
        <MenuItem name={"찜한 세탁소"} />
      </div>
    </div >
  );

}

export default MainView;
