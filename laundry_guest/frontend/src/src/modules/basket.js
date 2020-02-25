const SETBASKETITEMS = 'basket/SETBASKETITEMS';
const SETTOTALPRICE = 'basket/SETTOTALPRICE';

export const setBasketItemsRedux = (basketItems) => ({
  type: SETBASKETITEMS,
  basketItems: basketItems
});

export const setTotalPriceRedux = (totalPrice) => ({
  type: SETTOTALPRICE,
  totalPrice: totalPrice
});

const initialBasket = {
  totalPrice: 0,
  basketItems: []
};

const basket = (basket = initialBasket, action) => {
  switch (action.type) {
    case SETTOTALPRICE:
      return Object.assign({}, basket, {
        totalPrice: action.totalPrice
      })
    case SETBASKETITEMS:
      // 이미 같은 품목이 장바구니에 있으면 기존에 있던 품목 삭제
      basket.basketItems.forEach((basketItem, index) => {
        if (basketItem.clickedLaundryItem === action.basketItems.clickedLaundryItem) {
          basket.basketItems.slice(index, 1);
        }
      })

      return Object.assign({}, basket, {
        basketItems: [
          ...basket.basketItems,
          action.basketItems
        ]
      });
    default:
      return basket;
  }
}

export default basket;


// const SETCATEGORY = 'basket/SETCATEGORY';
// const SETPRICE = 'basket/SETPRICE';
// const COUNT = 'basket/COUNT';
// const REQUIREMENT = 'basket/REQUIREMENT';

// export const setCategoryRedux = (category) => ({
//     type: SETCATEGORY,
//     category: category
// });

// export const setPriceRedux = (price) => ({
//     type: SETPRICE,
//     price: price
// })

// export const setCountRedux = (count) => ({
//     type: COUNT,
//     count: count
// })

// export const setRequirementRedux = (requirement) => ({
//     type: REQUIREMENT,
//     requirement: requirement
// })

// const initialBasket = {
//     category: '',
//     price: 0,
//     수량: 
// }