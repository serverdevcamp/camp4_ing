import React from "react";
import styles from "./SignUpOperationList.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);
const SignUpOperationList = ({list}) =>{

    return(
        <ul className={cx('signUpOperationList')}>
            {list.map(item=>(
                <li key={item.id} className={cx('signUpOperationListItem')}> 요일 : {item.days.toString()} 개업시간 : {item.openTime} 폐업시간 : {item.closeTime} </li>
            ))}
        </ul>
    )

};

export default SignUpOperationList;