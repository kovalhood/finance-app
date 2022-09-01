import styles from "./UserMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";
import { LogoutButton } from "../UI/LogoutButton";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);

  return (
    <div className={styles.container}>
      <span className={styles.name}>{name.split("@")[0]}}</span>
      <LogoutButton />
    </div>
  );
};
