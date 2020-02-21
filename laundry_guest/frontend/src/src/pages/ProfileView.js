import React from 'react';
import className from 'classnames';
import Header from '../components/Common/Header';
import styles from '../components/ProfileView/ProfileView.scss';
import SignUpInputForm from '../components/ProfileView/ProfileInputForm';

const cx = className.bind(styles);
class ProfileView extends React.Component {


  // const getProfile = () => {

  //   axios.get(`${EndPoint.authServer}/laundry/`)
  //     .then(response => {
  //       if (response.data.response === 'success') {
  //         setLaundrys(response.data.data);
  //       }
  //       else {
  //         console.log(response);
  //       }
  //     })
  // }

  render() {

    const handleMain = () => {
      window.location.href = '/';
    }

    return (
      <div className={cx('signUpPage')} id={'signUpPage'}>
        <Header name={"회원정보"} handle={handleMain} />
        <SignUpInputForm />
      </div>
    )
  }
}

export default ProfileView;