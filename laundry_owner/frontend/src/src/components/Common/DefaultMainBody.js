import React from "react";
import style from './DefaultMainBody.scss';
import ShopMenu from "../ShopMenu/ShopMenu";

const DefaultMainBody = ({menuIndex,children}) =>{

    return(
        <div className={"defaultMainBodyDiv"}>
            <div className={"defaultMainMenuDiv"}>
                <ShopMenu menuIndex={menuIndex}/>
            </div>

            <div className={"defaultMainChildDiv"}>
                {children}
            </div>
        </div>
    )
};

export default DefaultMainBody;