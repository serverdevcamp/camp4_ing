import React from 'react';
import className from 'classnames';
import Header from '../components/Common/Header';
import styles from '../components/ProfileView/ProfileView.scss';
import SignUpInputForm from '../components/ProfileView/ProfileInputForm';

const cx = className.bind(styles);
class ProfileView extends React.Component {
  render() {

     const handleMain = () => {
      window.location.href = '/';
    }

    return (
      <div className={cx('signUpPage')} id={'signUpPage'}>
        <Header name={"회원정보"} handle={handleMain} />
          <SignUpInputForm/>
      </div>
    )
  }
}

export default ProfileView;