import React from 'react';
import styles from '../components/LoginView/LoginView.scss';
import className from 'classnames/bind';

import LoginInput from '../components/LoginView/LoginInput';

const cx = className.bind(styles);

class LoginView extends React.Component {


    render() {

        function handleSignUp(){
            window.location.href = "/signup";
        }

        return (
            <div className={cx("loginPage")}>
                <div className={cx('loginContent')}>
                    <div className={cx('leftPage')}>
                        <span className={cx('title')}>Laundry Runner</span>
                        <span className={cx('subTitle')}>For 사장님</span>
                    </div>
                    <div className={cx('rightPage')}>
                        <LoginInput handleSignUp={handleSignUp} />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;