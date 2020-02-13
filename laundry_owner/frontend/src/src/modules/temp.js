const INCREMENT = 'temp/INCREMENT';
const DECREMENT = 'temp/DECREMENT';

export const increment = () => ({type:INCREMENT});
export const decrement = () => ({type:DECREMENT});

const initialState = 0;

const temp = (state = initialState, action) => {
  switch(action.type){
    case INCREMENT:
      return state+1;
    case DECREMENT:
      return state-1;
    default:
      return state;
  }
};

export default temp;