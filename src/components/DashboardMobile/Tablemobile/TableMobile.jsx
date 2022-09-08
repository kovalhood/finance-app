import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import operations from '../../../redux/operation/authOperations';

import Transaction from './Transaction';
import styles from './TableMobile.module.scss';

export default function TableMobile({ date }) {
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  const dayQuery = new Date(date).getDate().toString().padStart(2, '0');
  const monthQuery = (new Date(date).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const yearQuery = new Date(date).getFullYear();

  useEffect(() => {
    dispatch(
      operations.getAllTransactions.allTransactions({
        dayQuery,
        monthQuery,
        yearQuery,
      })
    )
      .then(res => {
        const trans = res.payload;
        setTransactions(trans);
      })
      .catch(err => console.log(err));
  }, [dispatch, dayQuery, monthQuery, yearQuery]);

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
