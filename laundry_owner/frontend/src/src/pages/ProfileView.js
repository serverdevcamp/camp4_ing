import React from "react";
import className from 'classnames';
import backgroundStyle from '../components/Common/Background.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import ProfileModificationForm from "../components/ProfileView/ProfileModificationForm";

const cx = className.bind(backgroundStyle);

class ProfileView extends React.Component {

  render() {
    return (
      <div className={cx('defaultBackground')}>
        <DefaultHeader title={"정보 수정"}/>
        <DefaultMainBody menuIndex={1}>
          <ProfileModificationForm/>
        </DefaultMainBody>
      </div>
    )
  }

}

export default ProfileView;