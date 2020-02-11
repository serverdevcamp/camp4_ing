import React from 'react';
import classNames from 'classnames';
import styles from './MenuItem.scss';

const cx = classNames.bind(styles);

const MenuItem = ({ name, onClick, className }) => {
  return (
    <div
      className={cx('menu-item', className)}
      onClick={onClick}
    >
      {name}
    </div>
  )
}

export default MenuItem;