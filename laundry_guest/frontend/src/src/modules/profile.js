const SETUSERNAME = 'Profile/SETUSERNAME';

export const setUsernameRedux = (username) => ({
  type: SETUSERNAME, username: username
});

const initialProfile = {
  username: ''
};

const profile = (profile = initialProfile, action) => {
  switch (action.type) {
    case SETUSERNAME:
      return Object.assign({}, profile, {
        username: action.username
      });
    default:
      return profile;
  }
};

export default profile;