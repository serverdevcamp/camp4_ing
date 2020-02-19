import React from "react";
import className from 'classnames';
import style from './RegisterItemForm.scss';
import {Typography} from "@material-ui/core";
import CustomInput from "../Common/Input";
import {Select, MenuItem} from "@material-ui/core";
import CustomButton from "../Common/CustomButton";

const cx = className.bind(style);

const RegisterItemForm = ({
                            id, price, material, name, information, mode,
                            setId, setPrice, setMaterial, setName, setInformation,
                            registerItem, openRegistrationForm
                          }) => {


  return (
    <form
      className={cx('registerItemForm-form')}
      action={"#"}
      onSubmit={() => registerItem(mode, id,name, material, price, information)}
    >
      <div className={cx('registerItemForm-leftPage')}>
        <div className={cx('registerItemForm-registerRow')}>
          <Typography variant={"h6"}> 제품 이름 </Typography>
          <Select
            style={{width: "50%"}}
            value={name}
            defaultValue={'와이셔츠'}
            onChange={(e) => setName(e.target.value)}
          >
            <MenuItem value={'와이셔츠'}> 와이셔츠</MenuItem>
            <MenuItem value={'청바지'}> 청바지</MenuItem>
          </Select>
        </div>
        <div className={cx('registerItemForm-registerRow')}>
          <Typography variant={"h6"}> 제품 소재 </Typography>
          <Select
            style={{width: "50%"}}
            value={material}
            defaultValue={'와이셔츠'}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <MenuItem value={'와이셔츠'}> 와이셔츠</MenuItem>
            <MenuItem value={'청바지'}> 청바지</MenuItem>
          </Select>
        </div>
        <div className={cx('registerItemForm-registerRow')}>
          <Typography variant={"h6"}> 제품 가격 </Typography>
          <CustomInput
            className={cx('registerItemForm-priceInput')}
            value={price}
            onChangeEvent={setPrice}
            required={true}
          />
        </div>
      </div>
      <div className={cx('registerItemForm-rightPage')}>
        <Typography variant={"h6"}> 제품 특이사항 </Typography>
        <textarea
          className={cx('registerItemForm-etcText')}
          value={information}
          onChange={(e) => setInformation(e.target.value)}
          required={true}
        />
        <CustomButton
          type={'submit'}
          value={'제출하기'}
          className={cx('registerItemForm-submitBtn')}
        />
      </div>
    </form>
  )
};

export default RegisterItemForm;