import React from "react";
import HorizontalScrollView from "./HorizontalScrollView";
import RegisteredItemView from "./RegisteredItemView";
import DefaultMainBody from "../Common/DefaultMainBody";

const RegisteredItemList = ({items,openRegistrationForm,deleteItem}) => {

  return(
    <HorizontalScrollView>
      {
        items.map(item => (
          <RegisteredItemView
            key={item.id}
            name={item.category}
            material={item.material}
            price={item.price}
            information={item.information}
            id={item.id}
            openRegistrationForm = {openRegistrationForm}
            deleteItem={deleteItem}
          />
        ))
      }
    </HorizontalScrollView>
  )
};

export default RegisteredItemList;