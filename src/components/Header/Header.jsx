import styles from "./Header.module.css";
import { useMediaQuery } from "react-responsive";
import { Default, isDesktop } from "../../utils/mediaQuery";
import { Logo } from "../Logo/Logo";

export const Header = () => {
  const Desktop = isDesktop(useMediaQuery);

  return (
    <header className={Desktop ? styles.DesktopHeader : styles.TabletHeader}>
      <Logo />
      <button className={styles.btn}>fdgdfg</button>
    </header>
  );
};
