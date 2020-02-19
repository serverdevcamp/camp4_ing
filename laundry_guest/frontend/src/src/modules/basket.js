const SETBASKETITEMS = 'basket/SETBASKETITEMS';

export const setBasketItemsRedux = (basketItems) => ({
  type: SETBASKETITEMS,
  basketItems: basketItems
});

const initialBasket = {
  basketItems: []
};

const basket = (basket = initialBasket, action) => {
  switch (action.type) {
    case SETBASKETITEMS:
      console.log("basket################");
      console.log(action.basketItems);
      console.log(Object.assign({}, basket, {
        basketItems: [
          ...basket.basketItems,
          action.basketItems
        ]
      }));
      return Object.assign({}, basket, {
        basketItems: [
          ...basket.basketItems,
          action.basketItems
        ]
      });
    default:
      return initialBasket;
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