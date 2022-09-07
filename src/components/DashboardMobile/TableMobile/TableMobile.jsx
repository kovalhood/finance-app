import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import operations from '../../../redux/operation/authOperations';

import Transaction from './Transaction';
import styles from './Table.module.scss';

export default function Table() {
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  const location = useLocation();
  const date = location.search;
  //   const day = date.slice(5, 7);
  const month = date.slice(6, 8);
  console.log(month);
  const year = date.slice(13, 16);
  console.log(year);
  useEffect(() => {
    dispatch(operations.getAllTransactions.allTransactions({ month, year }))
      .then(res => {
        const trans = res.payload;
        setTransactions(trans);
      })
      .catch(err => console.log(err));
  }, [dispatch, month, year]);

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
  console.log(trans);

  //   const arrayLength = trans.length;

  //   function createTableOfNineRows(length) {
  //     if (length >= 16) {
  //       return;
  //     }
  //     if (length < 16) {
  //       const id = nanoid();
  //       transactions.push({
  //         _id: `${id}`,
  //         date: '',
  //         day: '',
  //         month: '',
  //         year: '',
  //         description: '',
  //         categories: '',
  //         value: null,
  //         income: true,
  //         // owner: '6315d0f27a7659ec61c4543f',
  //       });
  //       const newArrayLength = transactions.length;
  //       createTableOfNineRows(newArrayLength);
  //     }
  //   }

  //   createTableOfNineRows(arrayLength);
  // // console.log(transactions);

  return (
    <>
      <ul className={styles.transactionHistory}>
        {trans.map(item => (
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
      </ul>
    </>
  );
}
