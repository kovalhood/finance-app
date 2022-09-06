import React from 'react';
import { nanoid } from 'nanoid';
import Transaction from './Transaction';

import styles from './Table.module.scss';

export default function Table() {
  const transactions = [
    {
      _id: '6315d33a7a7659ec61c45447',
      day: '02',
      month: '06',
      year: '2022',
      description: 'My salary',
      categories: 'Salary',
      value: 70000,
      income: false,
      owner: '6315d0f27a7659ec61c4543f',
    },
    {
      _id: '6315d3e77a7659ec61c45457',
      day: '02',
      month: '06',
      year: '2022',
      description: 'Deposit',
      categories: 'Additional income',
      value: 1000,
      income: true,
      owner: '6315d0f27a7659ec61c4543f',
    },
    {
      _id: '6315d3e77a7659ec61c45487',
      day: '02',
      month: '06',
      year: '2022',
      description: 'Deposit',
      categories: 'Additional income',
      value: 1000,
      income: true,
      owner: '6315d0f27a7659ec61c4543f',
    },
    {
      _id: '6315d3e77a7659ec61c45497',
      day: '02',
      month: '06',
      year: '2022',
      description: 'Deposit',
      categories: 'Additional income',
      value: 1000,
      income: true,
      owner: '6315d0f27a7659ec61c4543f',
    },
  ];
  transactions.map(item => {
    const day = item.day;
    const month = item.month;
    const year = item.year;
    const date = `${day}.${month}.${year}`;
    item.date = date;
  });

  const arrayLength = transactions.length;

  function creatTableOfNineRows(length) {
    if (length >= 16) {
      return;
    }
    if (length < 16) {
      const id = nanoid();
      transactions.push({
        _id: `${id}`,
        date: '',
        description: '',
        categories: '',
        value: null,
        income: true,
        owner: '6315d0f27a7659ec61c4543f',
      });
      const newArrayLength = transactions.length;
      creatTableOfNineRows(newArrayLength);
    }
  }

  creatTableOfNineRows(arrayLength);
  console.log(transactions);

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
                  key={item.id}
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
