import styles from "./BackgroundImage.module.css";
import { Mobile, Tablet, Desktop } from "../../../utils/mediaQuery";
import { ReactComponent as TopDecor } from "../../../images/deskDecor.svg";

export const BackgroundImage = () => {
  return (
    <>
      <Mobile>
        <div className={styles.mobTop}></div>
      </Mobile>
      <Tablet>
        <div className={styles.tabletTop}></div>
        <div className={styles.tabletBottom}></div>
      </Tablet>
      <Desktop>
        <div className={styles.deskTop}></div>

        <div className={styles.deskBottom}></div>
      </Desktop>
    </>
  );
};
