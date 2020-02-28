import React from 'react';
import classNames from 'classnames';
import styles from './LaundryItem.scss';
import shirt from '../../static/image/shirt.jpeg';
import pant from '../../static/image/pant.jpeg';
import coat from '../../static/image/coat.jpeg';
import mantoman from '../../static/image/mantoman.jpeg';

const cx = classNames.bind(styles);

const LaundryItem = ({ className, category, material, price, onClick }) => {
    return (
        <div className={cx('laundry-item-container', className)} onClick={onClick}>
            <div className={cx('laundry-item-wrapper')}>
                {/* <div className={cx('laundry-image')}> */}
                {category === "셔츠" ? (
                    <img src={shirt} className={cx('laundry-image')} />
                ) : null
                }
                {category === "바지" ? (
                    <img src={pant} className={cx('laundry-image')} />
                ) : null
                }
                {category === "코트" ? (
                    <img src={coat} className={cx('laundry-image')} />
                ) : null
                }
                {category === "맨투맨" ? (
                    <img src={mantoman} className={cx('laundry-image')} />
                ) : null
                }
                {/* <div className={cx('image')}></div> */}
                {/* </div> */}
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