import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../../../redux/operation';
import styles from './CategoryInput.module.scss';

const CategoryInput = ({ type, categoryPick, setCategory }) => {
  const [isCategories, setIsCategories] = useState(true);
  const categories = useSelector(authSelectors.getCategories);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setIsCategories(!isCategories);
  };

  const handleCategoryClick = e => {
    setCategory(e.currentTarget.value);
    handleClick();
  };

  const expenses = categories.filter(category => {
    return category.type === 'expenses';
  });

  const income = categories.filter(category => {
    return category.type === 'income';
  });
  console.log(location.pathname);

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_input_category_parent} onClick={handleClick}>
        <input
          className={styles.form_input_category}
          autoComplete="off"
          id="category_input"
          type="text"
          readOnly
          value={categoryPick}
          placeholder={'Category'}
        />

        {isCategories ? (
          <span className={styles.arrow_down} id="arrow"></span>
        ) : (
          <span className={styles.arrow_up} id="arrow"></span>
        )}
      </div>
      {isCategories ? (
        <span></span>
      ) : (
        <ul className={styles.form_category_list}>
          {location.pathname === '/expense'
            ? expenses.map(data => (
                <li key={data.id}>
                  <label tabIndex={0} className={styles.category_label}>
                    <input
                      onClick={handleCategoryClick}
                      hidden
                      value={data.title}
                      readOnly
                      type="radio"
                      name="exp_category"
                      className={styles.radiobutton}
                    />
                    {data.title}
                  </label>
                </li>
              ))
            : income.map(data => (
                <li key={data.id}>
                  <label tabIndex={0} className={styles.category_label}>
                    <input
                      onClick={handleCategoryClick}
                      hidden
                      value={data.title}
                      readOnly
                      type="radio"
                      name="exp_category"
                      className={styles.radiobutton}
                    />
                    {data.title}
                  </label>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryInput;
