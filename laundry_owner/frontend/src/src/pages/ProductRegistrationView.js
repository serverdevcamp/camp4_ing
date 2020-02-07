import React from "react";
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import className from "classnames/bind";
import style from '../components/Common/Background.scss';
import HorizontalScrollView from "../components/ProductRegistrationView/HorizontalScrollView";
import RegisteredItemView from "../components/ProductRegistrationView/RegisteredItemView";
import {Typography} from "@material-ui/core";
import RegisterItemForm from "../components/ProductRegistrationView/RegisterItemForm";

const cx = className.bind(style);

class ProductRegistrationView extends React.Component{

    render() {


        return (
            <div className={cx('defaultBackground')}>
                <DefaultHeader title={"제품 등록"}/>
                <DefaultMainBody  menuIndex={2}>
                    <Typography
                        variant={"h6"}
                        gutterBottom>
                        등록된 제품
                    </Typography>
                    <HorizontalScrollView>
                        <RegisteredItemView/>
                        <RegisteredItemView/>
                        <RegisteredItemView/>
                    </HorizontalScrollView>

                    <Typography
                        style={{marginTop : '25px'}}
                        variant={"h6"}
                        gutterBottom>
                        제품 등록/수정
                    </Typography>
                    <RegisterItemForm/>
                </DefaultMainBody>
            </div>
        )
    }
}


export default ProductRegistrationView;