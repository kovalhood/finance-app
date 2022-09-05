import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import authSelectors from "../redux/auth/authSelectors";
import HomeView from "../views/HomeView/HomeView";

export const PublicRoute = ({ component }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? <Navigate to="/auth" /> : <HomeView />;
};
export default PublicRoute;

PublicRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
