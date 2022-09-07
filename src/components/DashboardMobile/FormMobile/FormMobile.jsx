import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoryInputMobile from './CategoryInputMobile';
import styles from './FormMobile.module.scss';
import sprite from '../../../images/sprite.svg';
import { authOperations } from '../../../redux/operation';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const FormMobile = ({ date, goBack }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sum, setSum] = useState('0.00');

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
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

    const dayQuery = new Date(date).getDate().toString().padStart(2, '0');
    const monthQuery = (new Date(date).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const yearQuery = new Date(date).getFullYear();

    const transaction = {
      value: parseInt(sum),
      categories: category,
      description: description,
      day: dayQuery,
      month: monthQuery,
      year: String(yearQuery),
    };
    const type = location.pathname.slice(1);

    dispatch(authOperations.addTransaction({ type, transaction }))
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        Notify.failure(`${error.message}`);
      });

    setDescription('');
    setSum('');

    goBack();
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
        <input
          className={styles.description}
          type="text"
          autoComplete="off"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <CategoryInputMobile
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
          <div className={styles.separator}></div>
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

export default FormMobile;
