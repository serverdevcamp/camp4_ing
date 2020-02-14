import React from "react";
import className from 'classnames';
import style from './RegisterItemForm.scss';
import {Typography} from "@material-ui/core";
import CustomInput from "../Common/Input";
import {Select, MenuItem} from "@material-ui/core";
import CustomButton from "../Common/CustomButton";

const cx = className.bind(style);

const RegisterItemForm = ({}) => {
  return (
    <form className={cx('registerItemForm-form')}>
      <div className={cx('registerItemForm-leftPage')}>
        <div className={cx('registerItemForm-registerRow')}>
          <Typography variant={"h6"}> 제품 이름 </Typography>
          <Select
            style={{width: "50%"}}
            value={'와이셔츠'}
            defaultValue={'와이셔츠'}
          >
            <MenuItem value={'와이셔츠'}> 와이셔츠</MenuItem>
            <MenuItem value={'청바지'}> 청바지</MenuItem>
          </Select>
        </div>
        <div className={cx('registerItemForm-registerRow')}>
          <Typography variant={"h6"}> 제품 소재 </Typography>
          <Select
            style={{width: "50%"}}
            value={'와이셔츠'}
            defaultValue={'와이셔츠'}
          >
            <MenuItem value={'와이셔츠'}> 와이셔츠</MenuItem>
            <MenuItem value={'청바지'}> 청바지</MenuItem>
          </Select>
        </div>
        <div className={cx('registerItemForm-registerRow')}>
          <Typography variant={"h6"}> 제품 가격 </Typography>
          <CustomInput className={cx('registerItemForm-priceInput')}/>
        </div>
      </div>
      <div className={cx('registerItemForm-rightPage')}>
        <Typography variant={"h6"}> 제품 특이사항 </Typography>
        <textarea className={cx('registerItemForm-etcText')}/>
        <CustomButton
          type={'submmit'}
          value={'제출하기'}
          className={cx('registerItemForm-submitBtn')}
        />
      </div>
    </form>
  )
};

export default RegisterItemForm;