import styles from './SummaryTrans.module.scss';
import { useMediaQuery } from 'react-responsive';
import { isDesktop, isTablet } from '../../utils/mediaQuery';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import operations from '../../redux/operation/authOperations';
import { useEffect } from 'react';

export const SummaryTrans = () => {
  const Desktop = isDesktop(useMediaQuery);
  const Table = isTablet(useMediaQuery);

  const dispatch = useDispatch();
  const { type } = useParams();
  console.log(type);

  useEffect(() => {
    dispatch(operations.getTransactionsByMonth(type));
  }, [dispatch, type]);

  return (
    <div className={Desktop || Table ? styles.container : styles.none}>
      <div className={styles.titleBlock}>
        <h3>
          Сводка
          <p>{}</p>
        </h3>
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
