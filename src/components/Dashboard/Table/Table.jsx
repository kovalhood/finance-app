import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import operations from '../../../redux/operation/authOperations';

import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Transaction from './Transaction';
// import getAllTransactions from '../../../redux/operation/authOperations';
import operations from '../../../redux/operation/authOperations';
import styles from './Table.module.scss';

export default function Table() {
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  const location = useLocation();
  const date = location.search;
  const day = date.slice(5, 7);
  const month = date.slice(14, 16);
  const year = date.slice(22, 26);
  const type = location.pathname.slice(1);
  useEffect(() => {
    dispatch(
      operations.getTransactionListByType({ type, day, month, year })
    ).then(res => {
      const trans = res.payload;
      setTransactions(trans);
    });
  }, [day, dispatch, month, type, year]);

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
  console.log(transactions);

  const arrayLength = trans.length;

  function creatTableOfNineRows(length) {
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
      creatTableOfNineRows(newArrayLength);
    }
  }

  creatTableOfNineRows(arrayLength);
  // // console.log(transactions);

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
              {transactions.map(item => (
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
