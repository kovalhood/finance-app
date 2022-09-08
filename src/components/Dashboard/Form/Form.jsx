import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CategoryInput from './CategoryInput';
import styles from './Form.module.scss';
import sprite from '../../../images/sprite.svg';
import { authOperations } from '../../../redux/operation';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import GlobalContext from '../../../context/GlobalContext';
import { commonDate } from '../../../utils/date';

const materialTheme = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#FF751D',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },

    // Hover color for icon
    MuiInput: {
      root: {
        '&:hover svg': {
          fill: '#FF751D',
        },
      },
    },
    MuiPickersDay: {
      day: {
        color: '#f88a46',
      },
      daySelected: {
        backgroundColor: '#FF751D',
      },
      dayDisabled: {
        color: '#C7CCDC',
      },
      current: {
        color: '#FF751D',
      },
    },
    MuiButton: {
      textPrimary: {
        color: '#FF751D',
      },
    },
    MuiTypography: {
      colorPrimary: {
        color: '#FF751D',
      },
    },
    MuiInputBase: {
      input: {
        cursor: 'pointer',
      },
    },
  },
});

const Form = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sum, setSum] = useState('0.00');
  // const [selectedDay, setSelectedDay] = useState('');
  // const [selectedMonth, setSelectedMonth] = useState('');
  // const [selectedYear, setSelectedYear] = useState('');

  const { daySelected, setDaySelected } = useContext(GlobalContext);
  setDaySelected(selectedDate);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  function handleQueryChange() {
    const dayQuery = new Date(selectedDate)
      .getDate()
      .toString()
      .padStart(2, '0');
    const monthQuery = (new Date(selectedDate).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const yearQuery = new Date(selectedDate).getFullYear();

    navigate(
      `${location.pathname}?day=${dayQuery}&month=${monthQuery}&year=${yearQuery}`
    );
  }

  useEffect(() => {
    handleQueryChange();
  }, [selectedDate]);

  useEffect(() => {
    handleQueryChange();

    setDescription('');
    setCategory('');
    setSum('');
  }, [location.pathname]);

  const handleDescriptionChange = event => {
    setDescription(event.currentTarget.value);
  };
  const handleCategoryChange = event => {
    setCategory(event.currentTarget.value);
  };
  const handleSumChange = event => {
    // setSum(Number(event.currentTarget.value).toFixed(2));
    setSum(event.currentTarget.value);
  };

  function handleSumKeydown(event) {
    ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (description.trim() === '') {
      setDescription('');
      return console.log('Input description of transaction');
    }

    if (category.trim() === '') {
      setCategory('');
      return console.log('Input category of transaction');
    }

    if (sum.trim() === '') {
      setSum('');
      return console.log('Input sum of transaction');
    }

    const dayQuery = new Date(selectedDate)
      .getDate()
      .toString()
      .padStart(2, '0');
    const monthQuery = (new Date(selectedDate).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const yearQuery = new Date(selectedDate).getFullYear();

    //============== Добавление Транзакции Income либо Expense
    const transaction = {
      // Объект transaction собрать из полей
      value: parseInt(sum),
      categories: category,
      description: description,
      day: dayQuery,
      month: monthQuery,
      year: String(yearQuery),
    };
    const type = location.pathname.slice(1); // Оставить

    dispatch(authOperations.addTransaction({ type, transaction }))
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        Notify.failure(`${error.message}`);
      });

    //===============

    setDescription('');
    setSum('');
  };

  const handleClear = event => {
    event.preventDefault();

    //===Проверка удаления транзакции

    const id = '63165843b34f6f28d0455e53';

    // dispatch(authOperations.deleteTransaction({id}))
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       Notify.failure(`${error.message}`);
    //     });
    const type = location.pathname.slice(1);
    // Получение всех транзакций по типу
    // const month = '09',
    //     year = '2022'
    //
    //
    // dispatch(authOperations.getTransactionListByType({type, month,year}))
    //     .then(response => {
    //         console.log(response.payload);
    //     })
    //     .catch(error => {
    //         Notify.failure(`${error.message}`);
    //     });
    //Получение за месяц транзакции
    //    dispatch(authOperations.getTransactionsByMonth({type}))
    //        .then(response => {
    //            console.log(response.payload);
    //        })
    //        .catch(error => {
    //            Notify.failure(`${error.message}`);
    //        });

    //==============================

    setSelectedDate(new Date());
    setDescription('');
    setCategory('');
    setSum('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.input_wrapper}>
        <ThemeProvider theme={materialTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableFuture
              format="dd.MM.yyyy"
              InputProps={{
                disableUnderline: true,
                style: {
                  width: 100,
                  fontSize: 12,
                  fontWeight: 900,
                  color: '#52555F',
                  cursor: 'pointer',
                },
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <Icon>
                      <svg
                        className={styles.calendar_icon}
                        width="20"
                        height="20"
                      >
                        <use href={`${sprite}#calendar`}></use>
                      </svg>
                    </Icon>
                  </InputAdornment>
                ),
              }}
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>

        <div className={styles.inputs}>
          <input
            className={styles.description}
            type="text"
            autoComplete="off"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <CategoryInput
            type="expenses"
            categoryPick={category}
            setCategory={setCategory}
            autoComplete="off"
            name="categories"
            value={category}
            onChange={handleCategoryChange}
          />

          <label className={styles.sum_label}>
            <svg className={styles.sum_icon} width="20" height="20">
              <use href={`${sprite}#calculator`}></use>
            </svg>
            <input
              className={styles.sum}
              type="number"
              autoComplete="off"
              name="sum"
              pattern="d\+\.\d\d$"
              placeholder="0.00"
              value={sum}
              onChange={handleSumChange}
              onKeyPress={handleSumKeydown}
            />
          </label>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="submit"
          className={styles.button_input}
          onClick={handleSubmit}
        >
          Add
        </button>
        <button
          type="button"
          className={styles.button_clear}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default Form;
