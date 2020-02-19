const SETUSERNAME = 'Profile/SETUSERNAME';
const SETUSERID = 'Profile/SETUSERID';
const SETSHOPID = 'Profile/SETSHOPID';

export const setUserName = (userName) => ({type: SETUSERNAME, userName : userName});
export const setShopId = (shopId) => ({type: SETSHOPID, shopId : shopId});
export const setUserId = (userId) => ({type: SETUSERID , userId : userId});

const initialProfile = {
  userName : 'a12',
  userId: '5',
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
    case SETUSERID:
      return Object.assign({},profile,{
        userId : action.userId
      });
    default:
      return initialProfile;
  }
};

export default profile;