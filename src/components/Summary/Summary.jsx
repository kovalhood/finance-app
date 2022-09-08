import styles from './Summary.module.scss';
import { isMobile } from '../../utils/mediaQuery';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/operation';
import { useLocation } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { formatSum } from '../../utils/formSum';
import { month } from '../../utils/month';
import { nanoid } from 'nanoid';

export const Summary = () => {
  const getBalance = useSelector(authSelectors.getBalance);
  const IsMobile = isMobile(useMediaQuery);
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = useState([]);
  const type = location.pathname.slice(1);

  useEffect(() => {
    dispatch(authOperations.getTransactionsByMonth({ type }))
      .then(response => {
        const { transactions } = response.payload;
        setData(transactions);
        dispatch(authOperations.fetchCurrentUser())
          .unwrap()
          .catch(() => {
            Notify.warning(
              'Sorry, your authorization token expired, please re-login',
              {}
            );
            dispatch(authOperations.logOut());
          });
      })
      .catch(error => {
        Notify.failure(`${error.message}`);
      });
  }, [type, getBalance]);

  const dataList = data
    .sort((x, y) => parseInt(y._id.month) - parseInt(x._id.month))
    .slice(0, 5);

  return (
    <div className={IsMobile ? styles.mobContainer : styles.container}>
      <h4 className={styles.title}>СВОДКА</h4>
      <ul className={styles.list}>
        {dataList.map(({ _id, total }) => (
          <li key={nanoid()} className={styles.item}>
            <span>{month[parseInt(_id.month) - 1]}</span>
            <span>{formatSum(total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
