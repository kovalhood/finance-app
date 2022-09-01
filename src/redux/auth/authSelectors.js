const getIsLoggedIn = (state) => state.auth.isLoggedIn;

const getUsername = (state) => state.auth.user.email;
const getIsFetchingCurrentUser = (state) => state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getIsFetchingCurrentUser,
};
export default authSelectors;
