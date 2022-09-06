const getIsLoggedIn = state => state.auth.isLoggedIn;

const getEmail = state => state.auth.user.email;
const getName = state => state.auth.user.name;
const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;
const getUserPicture = state => state.auth.user.picture;
const authSelectors = {
  getIsLoggedIn,
  getUserPicture,
  getEmail,
  getName,
  getIsFetchingCurrentUser,
};
export default authSelectors;
