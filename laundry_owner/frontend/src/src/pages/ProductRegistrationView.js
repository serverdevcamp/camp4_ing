import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import style from '../components/Common/Background.scss';
import axios from 'axios';
import className from "classnames/bind";
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import RegisterItemForm from "../components/ProductRegistrationView/RegisterItemForm";
import {useSelector} from "react-redux";
import EndPoint from "../config/EndPoint";
import RegisteredItemList from "../components/ProductRegistrationView/RegisteredItemList";

const cx = className.bind(style);

export const MODE = {
  REGISTRATION : 0x01,
  MODIFY: 0x02,
};

const ProductRegistrationView = ({}) => {

  const profile = useSelector(state => state.profile, []);

  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [mode, setMode] = useState(MODE.REGISTRATION);
  const [name, setName] = useState('와이셔츠');
  const [material, setMaterial] = useState('와이셔츠');
  const [price, setPrice] = useState('');
  const [information, setInformation] = useState('');


  const initInput = () => {
    setMode(MODE.REGISTRATION);
    setName('와이셔츠');
    setMaterial('와이셔츠');
    setPrice('');
    setInformation('');
    setShowForm(false);
  };

  const registerItem = (mode, name, material, price, information) => {
    const parsedPrice = parseInt(price, 10);
    const item = {
      category: name,
      material,
      price: parsedPrice,
      information,
      image: '0'
    };

    if (mode === MODE.REGISTRATION) {
      requestRegisterItem(item);
    }else{
      requestModifyItem(item);
    }
  };

  const requestRegisterItem = (item) => {
    axios.post(`${EndPoint.logicServer}/mylaundry/item_info/${profile.shopId}`, {
      item
    })
      .then(response => {
        if (response.data.response !== 'success') {
          alert('상품의 정보를 확인해 주세요.');
          console.log(response.data);
          return;
        }
        alert('상품이 올바르게 등록됐습니다.');
        initInput();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const requestModifyItem = (item) => {

  };

  const openRegistrationForm = (mode) => {
    setShowForm(true);
    setMode(mode);
  };

  const getItems = () => {
    const url = `${EndPoint.logicServer}/mylaundry/item_info/${profile.shopId}`;
    axios.get(url)
      .then(response => {
        if (response.data.response !== 'success') {
          console.log(response.data);
          alert('서버에서 아이템 리스트를 받는 중 오류가 발생했습니다.');
          return;
        }
        const data = response.data.data;
        setItems(data);
      })
      .catch(err => {
        alert('서버와의 통신중 오류가 발생했습니다.');

      })
  };

  useEffect(() => {
    setTimeout(getItems,100);
  }, []);


  return (
    <div className={cx('defaultBackground')}>
      <DefaultHeader title={"제품 등록"}/>
      <DefaultMainBody menuIndex={2}>
        <div className={cx('defaultSpaceBetween')}>
          <Typography
            variant={"h6"}
            gutterBottom>
            등록된 제품
          </Typography>
          <Typography
            variant={"button"}
            style={{cursor: "pointer", color: "#333333"}}
            onClick={() => openRegistrationForm(MODE.REGISTRATION)}
          >
            상품 등록하기
          </Typography>
        </div>
        <RegisteredItemList
          items={items}
          openRegistrationForm={openRegistrationForm}
        />

        {showForm ? (
          <div>
            <Typography
              style={{marginTop: '25px'}}
              variant={"h6"}
              gutterBottom>
              {mode === MODE.REGISTRATION ?
                ("상품 등록") : ("상품 수정")
              }
            </Typography>
            < RegisterItemForm
              mode={mode}
              price={price}
              material={material}
              name={name}
              information={information}
              setPrice={setPrice}
              setMaterial={setMaterial}
              setName={setName}
              setInformation={setInformation}
              registerItem={registerItem}
            />
          </div>
        ) : null}

      </DefaultMainBody>
    </div>
  )

};


export default ProductRegistrationView;