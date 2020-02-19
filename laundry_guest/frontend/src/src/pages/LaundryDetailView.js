import React, { useState, useEffect } from 'react';
import styles from '../components/LaundryDetailView/LaundryDetailView.scss';
import className from 'classnames/bind';
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import Header from '../components/Common/Header'
import Menu from '../components/Common/Menu';
import SubHeader from '../components/LaundryDetailView/SubHeader';
import LaundryItem from '../components/LaundryDetailView/LaundryItem';
import Review from '../components/Common/Review';
import LaundryItemModal from '../components/LaundryDetailView/LaundryItemModal';
import axios from 'axios';
import EndPoint from '../config/EndPoint';
import { useDispatch } from 'react-redux';
import { setBasketItemsRedux } from "../modules/basket";

const cx = className.bind(styles);

const LaundryDetailView = ({ match, history }) => {

  const [laundryDetail, setLaundryDetail] = useState({});
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [laundryItems, setLaundryItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [clickedLaundryItem, setClickedLaundryItem] = useState('');
  const [orderItems, setOrderItems] = useState([]);

  const [id] = useState(match.url.split('/').pop());
  const { name } = laundryDetail;

  const dispatch = useDispatch();

  const setOrderItemsInBasket = () => {
    dispatch(setBasketItemsRedux(orderItems));
  }

  const getLaundryDetail = () => {
    axios.get(`${EndPoint.laundryServer}/laundry/${id}`)
      .then(response => {
        if (response.data.response === 'success') {
          setLaundryItems(response.data.data['laundry_item']);
          setLaundryDetail(response.data.data);
        }
        else {
          console.error(response);
        }
      })
  }

  const getLaundryReview = () => {
    axios.get(`${EndPoint.laundryServer}/laundry/${id}/review/`)
      .then(response => {
        if (response.data.response === 'success') {
          setReviews(response.data.data);
        }
        else {
          console.error(response.data.message);
        }
      })
  }

  const onToggleModal = ({ category }) => {
    if (!isOpenedModal) {
      setClickedLaundryItem(category);
    }
    setIsOpenedModal(!isOpenedModal);
  };

  const leftComponent = laundryItems.map(({ id, category, material, price }) => {
    return (
      <LaundryItem
        key={id}
        category={category}
        material={material}
        price={price}
        onClick={() => onToggleModal({ category })}
      />
    )
  })

  const rightComponent = reviews.map(({ id, username, grade, content, created_at }) => {
    const date = new Date(created_at);
    const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return (
      <Review
        key={id}
        username={username}
        grade={grade}
        content={content}
        createdAt={createdAt}
      />
    )
  })

  console.log(orderItems);

  useEffect(() => {
    getLaundryDetail();
    getLaundryReview();
  }, []);

  return (
    <div className={cx('laundry-detail-page')}>
      <Header
        name={name}
        history={history}
      />
      <SubHeader laundryDetail={laundryDetail} />
      <Menu
        leftLabel={'메뉴'}
        rightLabel={'댓글'}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      >
      </Menu>
      <Link to={{
        pathname: `${match.url}/order`,
        state: { orderItems }
      }}>
        <Fab
          className={'fab-button'}
        >
          <ShoppingCartSharpIcon />
        </Fab>
      </Link>
      <LaundryItemModal
        isOpen={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
        onClick={onToggleModal}
        clickedLaundryItem={clickedLaundryItem}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        setOrderItemsInBasket={setOrderItemsInBasket}
      />
    </div>
  )

}

export default LaundryDetailView;