import React from 'react';
import classNames from 'classnames';
import styles from './LaundryItem.scss';

const cx = classNames.bind(styles);

const LaundryItem = ({ className, category, material, price, onClick }) => {
    return (
        <div className={cx('laundry-item-container', className)} onClick={onClick}>
            <div className={cx('laundry-item-wrapper')}>
                <div className={cx('laundry-image')}>
                    <div className={cx('image')}></div>
                </div>
                <div className={cx('laundry-content')}>
                    <div className={cx('category')}>
                        {category}</div>
                    <div className={cx('material')}>
                        <div>소재 :</div>
                        <div>{material}</div>
                    </div>
                    <div className={cx('price')}>
                        <div>가격 :</div>
                        <div>{price}원</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LaundryItem;