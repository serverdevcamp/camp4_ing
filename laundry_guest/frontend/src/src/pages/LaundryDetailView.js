import React from 'react';
import styles from '../components/LaundryDetailView/LaundryDetailView.scss';
import className from 'classnames/bind';
import Header from '../components/Common/Header'
import Menu from '../components/Common/Menu';
import SubHeader from '../components/LaundryDetailView/SubHeader';
import LaundryItem from '../components/LaundryDetailView/LaundryItem'
import Review from '../components/Common/Review'

const cx = className.bind(styles);

const data = {
  name: "스마일 세탁소",
  information: "안녕하세요 옷 잘 빨기로 소문난 스마일 세탁소 입니다. 여러분의 옷을 깨끗하게 세탁해드립니다.",
  grade: 4.5,
  minPrice: 10000,
  deliveryTime: "2일",
}

const laundryItemData = [
  {
    id: 1,
    category: "바지",
    material: "면",
    price: 2000
  },
  {
    id: 2,
    category: "셔츠",
    material: "린넨",
    price: 3000
  },
  {
    id: 3,
    category: "바지",
    material: "청",
    price: 4000
  },
]

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

class LaundryDetailView extends React.Component {
  render() {

    const { name, information, grade, minPrice, deliveryTime } = data;

    const leftComponent = laundryItemData.map(({ id, category, material, price }) => {
      return (
        <LaundryItem
          key={id}
          category={category}
          material={material}
          price={price}
        />
      )
    })

    const rightComponent = reviewData.map(({ id, author, grade, content, created_at }) => {
      return (
        <Review
          key={id}
          author={author}
          grade={grade}
          content={content}
          createdAt={created_at}
        />
      )
    })

    const handleLaundryList = () => {
      window.location.href = '/laundrylist';
    }
    return (
      <div className={cx('laundry-detail-page')}>
        <Header name={name} handle={handleLaundryList} />
        <SubHeader data={data} />
        <Menu
          leftLabel={'메뉴'}
          rightLabel={'댓글'}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        >
        </Menu>
      </div>
    )
  }
}

export default LaundryDetailView;