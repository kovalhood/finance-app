import styles from "./SummaryTrans.module.css";

export const SummaryTrans = () => {
  return (
    <div className={styles.container}>
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
