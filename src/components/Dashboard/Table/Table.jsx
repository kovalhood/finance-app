import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import operations from '../../../redux/operation/authOperations';
import { nanoid } from 'nanoid';
import Transaction from './Transaction';
// import getAllTransactions from '../../../redux/operation/authOperations';
import styles from './Table.module.scss';
import { authOperations, authSelectors } from '../../../redux/operation';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { commonDate } from '../../../utils/date';

export default function Table() {
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  const location = useLocation();
  const date = location.search;
  const day = location.search.slice(5, 7);
  const month = location.search.slice(14, 16);
  const year = location.search.slice(22, 26);
  const getBalance = useSelector(authSelectors.getBalance);
  const type = location.pathname.slice(1);

  useEffect(() => {
    const dayQuery = new Date().getDate().toString().padStart(2, '0');
    const monthQuery = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const yearQuery = new Date().getFullYear();
    const date = commonDate(new Date());

    const params = {
      type,
      day: date.day,
      month: date.month,
      year: date.year,
    };
    dispatch(authOperations.getTransactionListByType(params)).then(
      res => {
        const trans = res.payload;
        setTransactions(trans);
        dispatch(authOperations.fetchCurrentUser())
          .unwrap()
          .catch(() => {
            Notify.warning(
              'Sorry, your authorization token expired, please re-login',
              {}
            );
            dispatch(authOperations.logOut());
          });
      },
      () => {
        setTransactions([]);
      }
    );
  }, [type, getBalance]);

  const trans = transactions.map(item => {
    const day = item.day;
    const month = item.month;
    const year = item.year;
    if (day === '' && month === '' && year === '') {
      return;
    } else {
      const date = `${day}.${month}.${year}`;
      item.date = date;
    }
  });

  const arrayLength = trans.length;

  function createTableOfNineRows(length) {
    if (length >= 16) {
      return;
    }
    if (length < 16) {
      const id = nanoid();
      transactions.push({
        _id: `${id}`,
        date: '',
        day: '',
        month: '',
        year: '',
        description: '',
        categories: '',
        value: null,
        income: true,
        // owner: '6315d0f27a7659ec61c4543f',
      });
      const newArrayLength = transactions.length;
      createTableOfNineRows(newArrayLength);
    }
  }

  createTableOfNineRows(arrayLength);
  return (
    <>
      <div className={styles.scroll}>
        <div className={styles.window}>
          <table className={styles.transactionHistory}>
            {/* <thead className={styles.thead}>
              <tr>
                <th>DATE</th>
                <th>DESCRIPTION</th>
                <th>CATEGORY</th>
                <th>SUM</th>
                <th></th>
              </tr>
            </thead> */}

            <tbody>
              {transactions &&
                transactions.map(item => (
                  <Transaction
                    key={item._id}
                    id={item._id}
                    date={item.date}
                    description={item.description}
                    category={item.categories}
                    sum={item.value}
                    income={item.income}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
