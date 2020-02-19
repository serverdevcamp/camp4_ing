import React from 'react';
import className from 'classnames';
import styles from './Input.scss';

const cx = className.bind(styles);

const CustomInput = ({ type, onBlurEvent, onChangeEvent, onClickEvent, onKeyUpEvent, required, className, placeHolder, readOnly, value, reference }) => {
  return (
    <input
      className={cx('customDefaultInput', className)}
      type={type}
      onBlur={onBlurEvent}
      onChange={onChangeEvent}
      onClick={onClickEvent}
      onKeyUp={onKeyUpEvent}
      placeholder={placeHolder}
      required={required}
      readOnly={readOnly}
      value={value}
      ref={reference}
    />
  )
}

export default CustomInput;