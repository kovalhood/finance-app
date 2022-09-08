import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDate, getDate } from '../../redux/reports';
import styles from './MonthPicker.module.scss';

const initialState = {
  month: new Date(Date.now()).getMonth() + 1,
  year: new Date(Date.now()).getFullYear(),
};

const MONTH_NAMES = {
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december',
};

const MonthPicker = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(initialState);
  const dateRedux = useSelector(getDate);
  const currentDate = t(MONTH_NAMES[dateRedux.month]) + ' ' + dateRedux.year;

  const handleMonthDecrement = () => {
    setDate(prev => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: (prev.month = 12) };
      }

      return { ...prev, month: prev.month - 1 };
    });
  };

  const handleMonthIncrement = () => {
    setDate(prev => {
      if (prev.month === 12) {
        return { year: prev.year + 1, month: (prev.month = 1) };
      }

      return { ...prev, month: prev.month + 1 };
    });
  };

  useEffect(() => {
    dispatch(updateDate(date));
  }, [date, dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        <button
          type="button"
          onClick={handleMonthDecrement}
          className={styles.btn}
        >
          {/* <IconSvg icon="smallArrowLeft" /> */}
          <svg
            width="7"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 1 2 6l4 5" stroke="#FF751D" strokeWidth="2" />
          </svg>
        </button>

        <p className={styles.title}>{currentDate}</p>

        <button
          type="button"
          onClick={handleMonthIncrement}
          className={styles.btn}
        >
          {/* <IconSvg className="icon" icon="smallArrowRight" /> */}

          <svg
            width="7"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m1 1 4 5-4 5" stroke="#FF751D" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MonthPicker;
