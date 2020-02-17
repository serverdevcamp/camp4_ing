import React from "react";
import HorizontalScrollView from "./HorizontalScrollView";
import RegisteredItemView from "./RegisteredItemView";
import DefaultMainBody from "../Common/DefaultMainBody";

const RegisteredItemList = ({items,openRegistrationForm}) => {

  let index = 0;

  return(
    <HorizontalScrollView>
      {
        items.map(item => (
          <RegisteredItemView
            key={index++}
            name={item.category}
            material={item.material}
            price={item.price}
            openRegistrationForm = {openRegistrationForm}
          />
        ))
      }
    </HorizontalScrollView>
  )
};

export default RegisteredItemList;