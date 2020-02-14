import React from 'react';
import className from 'classnames';
import styles from './input.scss';

const cx = className.bind(styles);

const CustomInput = ({
                       type, onClickEvent, onKeyUpEvent,
                       required, className, placeHolder, readOnly,
                       value, reference
                     }) => {

  return (
    <input className={cx('customDefaultInput', className)} type={type}
           onClick={onClickEvent} onKeyUp={onKeyUpEvent}
           placeholder={placeHolder}
           required={required}
           readOnly={readOnly}
           value={value}
           ref={reference}
    />
  );

};

export default CustomInput;