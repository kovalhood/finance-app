import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Calendar from '../../Calendar';
import CategoryInput from './CategoryInput';
import styles from './Form.module.scss';
import sprite from '../../../images/sprite.svg';
import { authOperations } from '../../../redux/operation';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import GlobalContext from '../../../context/GlobalContext';

const Form = () => {
  // const { daySelected, setDaySelected } = useContext(GlobalContext);
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sum, setSum] = useState('');

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

  // Rules for Description input keydown events
  function handleDescriptionKeydown(event) {
    const inputDescription = event.currentTarget.value;
    if (inputDescription.length === 19) {
      Notify.warning('Description length must be less than 20 characters');
    }
  }

  // Rules for Sum input keydown events
  function handleSumKeydown(event) {
    const inputSum = event.currentTarget.value;
    if (inputSum === '') {
      ['e', 'E', '+', '-', '.', '0'].includes(event.key) &&
        event.preventDefault();
    }
    if (inputSum !== '') {
      ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
    }
    // Rule for not letting enter more than two digits after the dot
    if (inputSum.includes('.') && String(inputSum).split('.')[1].length === 2) {
      [
        'e',
        'E',
        '+',
        '-',
        '.',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ].includes(event.key) && event.preventDefault();
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (
      description.trim() === '' &&
      category.trim() === '' &&
      sum.trim() === ''
    ) {
      setDescription('');
      setCategory('');
      setSum('');
      return Notify.warning('Enter transaction info');
    }

    if (description.trim() === '' && category.trim() === '') {
      setDescription('');
      setCategory('');
      return Notify.warning('Enter transaction description and category');
    }

    if (description.trim() === '' && sum.trim() === '') {
      setDescription('');
      setSum('');
      return Notify.warning('Enter transaction description and sum');
    }

    if (category.trim() === '' && sum.trim() === '') {
      setCategory('');
      setSum('');
      return Notify.warning('Enter transaction category and sum');
    }

    if (description.trim() === '') {
      setDescription('');
      return Notify.warning('Enter transaction description');
    }

    if (category.trim() === '') {
      setCategory('');
      return Notify.warning('Enter transaction category');
    }

    if (sum.trim() === '') {
      setSum('');
      return Notify.warning('Enter transaction sum');
    }

    if (description.length < 3) {
      return Notify.warning(
        'Description length must be more than 2 characters'
      );
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

    Notify.success('Transaction added');
    setDescription('');
    setSum('');
  };

  const handleClear = event => {
    event.preventDefault();

    setDescription('');
    setCategory('');
    setSum('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.input_wrapper}>
        <Calendar dateHandler={setSelectedDate} />

        <div className={styles.inputs}>
          <input
            className={styles.description}
            type="text"
            autoComplete="off"
            maxLength="20"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            onKeyPress={handleDescriptionKeydown}
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
