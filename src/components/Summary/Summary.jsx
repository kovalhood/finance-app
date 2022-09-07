import styles from './Summary.module.css';
import { isMobile, isTablet } from '../../utils/mediaQuery';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/operation';
import { useLocation } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { formatSum } from '../../utils/formSum';
import { month } from '../../utils/month';

const exampleSummary = [
  { month: 0, sum: 10000.0 },
  { month: 1, sum: 10000.0 },
  { month: 2, sum: 100.0 },
  { month: 3, sum: 10000.0 },
  { month: 4, sum: 1000.0 },
  { month: 5, sum: 10000.0 },
  { month: 6, sum: 10000.0 },
  { month: 7, sum: 10000.0 },
  { month: 8, sum: 10000.0 },
  { month: 9, sum: 10000.0 },
  { month: 10, sum: 10000.0 },
  { month: 11, sum: 10000.0 },
];

export const Summary = () => {
  const IsMobile = isMobile(useMediaQuery);
  const IsTablet = isTablet(useMediaQuery);
  const dispatch = useDispatch();
  const location = useLocation();
  // const [type, setType] = useState('');
  const [data, setData] = useState(null);
  const type = location.pathname.slice(1);

  useEffect(() => {
    console.log(type, '  ___TYPE');
    dispatch(authOperations.getTransactionsByMonth({ type }))
      .then(response => {
        const { transactions } = response.payload;
        setData(transactions);
        console.log(transactions);
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
  }, [type]);
  data.sort((x, y) => parseInt(x._id.month) - parseInt(y._id.month));

  return (
    <div className={IsMobile ? styles.mobContainer : styles.container}>
      <h4 className={styles.title}>СВОДКА</h4>
      <ul className={styles.list}>
        {data.map(({ _id, total }) => (
          <li className={styles.item}>
            <span>{month[parseInt(_id.month)]}</span>
            <span>{formatSum(total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
