const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUserEmail = state => state.auth.user.email;
const getUserPicture = state => state.auth.user.picture;

const authSelectors = {
  getIsLoggedIn,
  getUserEmail,
  getUserPicture
};

export default authSelectors;
