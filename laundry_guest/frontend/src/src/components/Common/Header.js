import React from 'react';
import classNames from 'classnames';
import styles from './Header.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const cx = classNames.bind(styles);

const Header = ({ name }) => {
  return (
    <div className={cx('header-wapper')}>
      <div className={cx('header-content')}>
        <div className={cx('arrow-wapper')}>
          <ArrowBackIcon />
        </div>
        <div className={cx('page-name')}>{name}</div>
      </div>
    </div>
  )
}

export default Header;