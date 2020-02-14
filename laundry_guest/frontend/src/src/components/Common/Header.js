import React from 'react';
import classNames from 'classnames';
import styles from './Header.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const cx = classNames.bind(styles);

const Header = ({ className, name, history }) => {

  const hanldeGoBack = () => history.goBack();
  return (
    <div className={cx('header-wrapper', className)}>
      <div className={cx('header-content')}>
        <div className={cx('arrow-wrapper')} onClick={hanldeGoBack}>
          <ArrowBackIcon />
        </div>
        <div className={cx('page-name')}>{name}</div>
      </div>
    </div >
  )
}

export default Header;