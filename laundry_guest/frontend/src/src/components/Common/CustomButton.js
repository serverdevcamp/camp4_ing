import React from 'react';
import className from 'classnames';
import style from './CustomButton.scss';

const cx = className.bind(style);

// isInActive : 비활성화 될 경우 배경색 변경을 위해
const CustomButton = ({ type, onClick, className, value, isInActive }) => {
    let _type;
    if (type === 'submit')
        _type = 'submit';
    else
        _type = 'button';

    return (
        <input
            type={_type}
            onClick={onClick}
            value={value}
            className={cx('customButtonDefault', className, {
                activeButton: isInActive
            })}
        />
    )
};

export default CustomButton;