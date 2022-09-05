import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import svgSprite from '../../images/sprite.svg';
import { IconSvg } from '../UI';
import s from './Reports.module.scss';

const Reports = ({ finance, categories }) => {
  const { t } = useTranslation();

  const [isExpenses, setIsExpenses] = useState(true);
  const [category, setCategory] = useState(categories[0].name);

  const handleBtnClick = () => {
    setIsExpenses(prev => !prev);
  };

  const handleCategoryClick = value => {
    setCategory(value);
    console.log('click');
  };

  return (
    <>
      <div className={s.financeWrapper}>
        <div className={s.expensesWrapper}>
          <p className={s.financeTitle}>{`${t('reportsExpenses') + ':'}`}</p>
          <p className={s.expenses}>{`- ${finance.expenses} ${t('hrn')}`}</p>
        </div>
        <span className={s.divider} />
        <div className={s.incomesWrapper}>
          <p className={s.financeTitle}>{`${t('reportsIncomes') + ':'}`}</p>
          <p className={s.incomes}>{`+ ${finance.incomes} ${t('hrn')}`}</p>
        </div>
      </div>

      <div className={s.switchWrapper}>
        <div className={s.btnWrapper}>
          <button
            type="button"
            onClick={handleBtnClick}
            className={s.switchBtn}
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
          <p className={s.switchTitle}>
            {isExpenses ? t('reportsExpenses') : t('reportsIncomes')}
          </p>
          <button
            type="button"
            onClick={handleBtnClick}
            className={s.switchBtn}
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

        <ul className={s.categories}>
          {categories.map(({ name, svg, value }) => {
            return (
              <li key={name} className={s.category}>
                <p className={s.categoryValue}>{value}</p>
                <button
                  type="button"
                  className={
                    category === name ? s.categoryBtnActive : s.categoryBtn
                  }
                  onClick={() => handleCategoryClick(name)}
                >
                  <IconSvg
                    sprite={svgSprite}
                    icon={svg}
                    className={s.categoryIcon}
                  />
                </button>
                <span
                  className={
                    category === name
                      ? s.categoryBackgroundActive
                      : s.categoryBackground
                  }
                />
                <p className={s.categoryName}>{name}</p>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <>{!!category && categories[category].map()}</> */}
    </>
  );
};

export default Reports;
