import styles from "./Header.module.css";
import { useMediaQuery } from "react-responsive";
import { Default, isDesktop } from "../../utils/mediaQuery";
import { Logo } from "../Logo/Logo";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";
import { UserMenu } from "../UserMenu";

export const Header = () => {
  const Desktop = isDesktop(useMediaQuery);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <header className={Desktop ? styles.DesktopHeader : styles.TabletHeader}>
      <Logo />
      {isLoggedIn ? <UserMenu /> : null}
    </header>
  );
};
