const SETUSERNAME = 'Profile/SETUSERNAME';
const SETSHOPID = 'Profile/SETSHOPID';

export const setUserName = (userName) => ({type: SETUSERNAME, userName : userName});
export const setShopId = (shopId) => ({type: SETSHOPID, shopId : shopId});

const initialProfile = {
  userName : 'a12',
  shopId : '5',
};

const profile = (profile = initialProfile, action) =>{
  switch(action.type){
    case SETUSERNAME:
      return Object.assign({},profile,{
        userName: action.userName
      });
    case SETSHOPID:
      return Object.assign({},profile,{
        shopId : action.shopId
      });
    default:
      return initialProfile;
  }
};

export default profile;