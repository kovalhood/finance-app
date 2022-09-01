import styles from "./LogoutButton.module.css";
import Button from "react-bootstrap/Button";
import { authSelectors, authOperations } from "../../../redux/auth";
import { useDispatch } from "react-redux";

export const LogoutButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      className={styles.button}
      onClick={() => dispatch(authOperations.logOut())}
    >
      Вийти
    </Button>
  );
};
