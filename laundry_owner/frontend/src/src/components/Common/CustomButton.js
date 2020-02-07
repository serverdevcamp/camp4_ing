import React from "react";
import className from 'classnames';
import style from './CustomButton.scss';

const cx = className.bind(style);

const CustomButton = ({type, onClick, className, value}) => {

    let _type;
    if (type === 'submit')
        _type = 'submit';
    else
        _type = 'button';

    return (
        <input type={_type} onClick={onClick} value={value} className={cx('customButtonDefault',className)}/>
    )
};

export default CustomButton;