import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Transaction from './Transaction';
import styles from './Table.module.scss';
import { authOperations, authSelectors } from '../../../redux/operation';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { commonDate } from '../../../utils/date';
import { formatSum } from '../../../utils/formSum';
import GlobalContext from '../../../context/GlobalContext';

export default function Table() {
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  const location = useLocation();
  const getBalance = useSelector(authSelectors.getBalance);
  const type = location.pathname.slice(1);
  const { daySelected } = useContext(GlobalContext);

  useEffect(() => {
    const date = commonDate(daySelected);
    const params = {
      type,
      day: date.day,
      month: date.month,
      year: date.year,
    };
    dispatch(authOperations.getTransactionListByType(params)).then(
      res => {
        if (res.payload === undefined) {
          return setTransactions([]);
        }
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
  }, [type, getBalance, daySelected]);

  const trans = transactions.map(item => {
    const sum = item.value;
    const day = item.day;
    const month = item.month;
    const year = item.year;
    if (day === '' && month === '' && year === '' && sum === '') {
      return;
    } else {
      const date = `${day}.${month}.${year}`;
      item.date = date;
      // console.log(item.value)
      // const newSum = formatSum(item.value);
      // console.log(newSum, "после форматир")
      // item.value = newSum;
    }
  });

  const arrayLength = trans.length;
  console.log(transactions);
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
