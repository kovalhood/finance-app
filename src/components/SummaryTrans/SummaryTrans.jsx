import styles from "./SummaryTrans.module.scss";
import { useMediaQuery } from "react-responsive";
import { isDesktop } from "../../utils/mediaQuery";
export const SummaryTrans = () => {
  const Desktop = isDesktop(useMediaQuery);
  return (
    <div className={Desktop ? styles.container : styles.none}>
      <div className={styles.titleBlock}>
        <div className={styles.titleCont}>
          <div className={styles.btnBlock}></div>
          <div>
            Сводка
            <p>{}</p>
          </div>
          <div className={styles.btnBlock}></div>
        </div>
      </div>

      <ul>
        {/* <li key={""} className={styles.monthPoint}>
          <p className={styles.monthPointText}>{""}</p>
          <p className={styles.monthPointText}>{""}</p>
        </li> */}

        <div className={styles.list}> </div>
      </ul>
    </div>
  );
};
