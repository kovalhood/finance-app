import styles from './Header.module.css'
import {useMediaQuery} from 'react-responsive';
import {Default, isDesktop} from '../../utils/mediaQuery';
import {Logo} from "../Logo/Logo";
import {UserName} from "../UI/Username";
import {LogOutButton} from "../UI/LogoutButton";

export const Header = () => {
  const isLoggedIn = false;
  const Desktop = isDesktop(useMediaQuery);

  return (
      <header
        className={Desktop ? styles.DesktopHeader : styles.TabletHeader}
      >
        <Logo/>
      </header>
  )
}
