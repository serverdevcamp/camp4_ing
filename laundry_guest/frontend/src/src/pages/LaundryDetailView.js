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


const cx = className.bind(styles);

const reviewData = [
  {
    id: 1,
    author: "강민성",
    grade: 4,
    content: "깨끗하게 잘 빨아줍니다.",
    created_at: "2020-02-10"
  },
  {
    id: 2,
    author: "김동근",
    grade: 3,
    content: "사장님이 친절하세요.",
    created_at: "2020-02-09"
  },
  {
    id: 3,
    author: "이수진",
    grade: 4,
    content: "깨끗하게 잘 빨아줍니다.",
    created_at: "2020-02-10"
  }
]

const LaundryDetailView = ({ match, history }) => {

  const [laundryDetail, setLaundryDetail] = useState({});
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [laundryItems, setLaundryItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [id] = useState(match.url.split('/').pop());
  const { name } = laundryDetail;

  const getLaundryDetail = () => {
    axios.get(`${EndPoint.laundryServer}/laundry/${id}`)
      .then(response => {
        if (response.data.response === 'success') {
          console.log(response.data.data);
          console.log(response.data.data['laundry_item']);

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
          console.log(response.data.data);
          setReviews(response.data.data);
        }
        else {
          console.error(response.data.message);
        }
      })
  }

  const onToggleModal = () => {
    setIsOpenedModal(!isOpenedModal);
  };

  const leftComponent = laundryItems.map(({ id, category, material, price }) => {
    return (
      <LaundryItem
        key={id}
        category={category}
        material={material}
        price={price}
        onClick={onToggleModal}
      />
    )
  })

  const rightComponent = reviews.map(({ id, username, grade, content, created_at }) => {
    console.log(created_at);
    console.log(typeof created_at);
    const date = new Date(created_at);
    console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
    const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    console.log(typeof createdAt);
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

  const handleLaundryList = () => {
    window.location.href = '/laundrylist';
  }

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
      <Link to={`${match.url} / order`}>
        <Fab
          className={'fab-button'}
          color={'rgba(204, 204, 204, 0.6)'}
        >
          <ShoppingCartSharpIcon />
        </Fab>
      </Link>
      <LaundryItemModal
        isOpen={isOpenedModal}
        onClick={onToggleModal}
      />

    </div>
  )

}

export default LaundryDetailView;