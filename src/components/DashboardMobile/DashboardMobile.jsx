import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Balance } from '../Balance';
import CalendarMobile from './CalendarMobile/CalendarMobile';
import ControlsMobile from './ControlsMobile';
import FormMobile from './FormMobile';
import TableMobile from './TableMobile';
import styles from './DashboardMobile.module.scss';
import sprite from '../../images/sprite.svg';

export const DashboardMobile = () => {
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [addTransaction, setAddTransaction] = useState(false);

  const handleControlsClick = () => {
    setAddTransaction(!addTransaction);
  };

  const navigate = useNavigate();
  const location = useLocation();

  function handleQueryChange() {
    const dayQuery = new Date(transactionDate)
      .getDate()
      .toString()
      .padStart(2, '0');
    const monthQuery = (new Date(transactionDate).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const yearQuery = new Date(transactionDate).getFullYear();

    navigate(
      `${location.pathname}?day=${dayQuery}&month=${monthQuery}&year=${yearQuery}&transactions=all`
    );
  }

  useEffect(() => {
    handleQueryChange();
  }, [transactionDate, location.pathname, addTransaction]);

  return (
    <>
      <div className={styles.container}>
        {addTransaction ? (
          <div className={styles.transaction_wrapper}>
            <button
              className={styles.button_back}
              onClick={handleControlsClick}
              type="button"
            >
              <svg className={styles.calendar_icon} width="24" height="24">
                <use href={`${sprite}#go_back`}></use>
              </svg>
            </button>
            <FormMobile date={transactionDate} goBack={handleControlsClick} />
          </div>
        ) : (
          <>
            <Balance />
            <div className={styles.calendar_wrapper}>
              <CalendarMobile dateHandler={setTransactionDate} />
            </div>

            <TableMobile date={transactionDate} />

            <div className={styles.controls} onClick={handleControlsClick}>
              <ControlsMobile link={'/expense'} title={'Expense'} />
              <ControlsMobile link={'/income'} title={'Income'} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
