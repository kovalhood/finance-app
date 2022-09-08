import React from 'react';
import styles from './HeaderTable.module.scss';

export function HeaderTable() {
  return (
    <>
      <div className={styles.header}>
        <p className={styles.date}>Date</p>
        <p className={styles.description}>Description</p>
        <p className={styles.category}>Category</p>
        <p className={styles.sum}>Sum</p>
        <p className={styles.action}></p>
      </div>
    </>
  );
}
