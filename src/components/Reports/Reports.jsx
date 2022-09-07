import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconSvg } from '../UI';
import { Loader } from '../Loader';
import svgSprite from '../../images/sprite.svg';
import {
  getTransactions,
  getType,
  getData,
  getError,
  getDate,
  getIsLoading,
  updateType,
} from '../../redux/reports';
import s from './Reports.module.scss';
import { Charts } from '../Charts';
import { formatSum } from '../../utils/formSum';

const Reports = ({ finance }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [currentCategory, setCurrentCategory] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  const transactions = useSelector(getTransactions);
  const type = useSelector(getType);
  const date = useSelector(getDate);
  const error = useSelector(getError);
  const isLoading = useSelector(getIsLoading);

  const isExpenseCategory = type === 'expense' ? 'income' : 'expense';
  const isExpenseTitle =
    type === 'expense' ? t('reportsExpenses') : t('reportsIncomes');

  // console.log(date, '---------------date');
  // console.log(transactions, 'transactions');
  // console.log(type, 'type');
  console.log(chartsData, 'chartsData');

  const map = chartsData.map(
    ({ totalDescriptionSum, _id: { description } }) => {
      console.log(totalDescriptionSum, description, '3333333333333333333');
      return { sum: totalDescriptionSum, category: description };
    }
  );
  console.log(map);

  useEffect(() => {
    (async function () {
      try {
        if (Object.keys(date).length) {
          const { year, month } = date;
          const normalizeMonth =
            month.toString().length === 1 ? '0' + month : month;

          await dispatch(getData({ type, normalizeMonth, year })).unwrap();
        }
      } catch (error) {
        console.log(error, 'error');
      }
    })();
  }, [date, dispatch, type]);

  useEffect(() => {
    resetCategory();
  }, [date]);

  console.log(currentCategory, 'currentCategory');

  // useEffect(() => {
  //   if (transactions.length) {
  //     setChartsData(transactions);
  //   }
  // }, [transactions]);

  // * work
  // const [category, setCategory] = useState(categories[0]._id);
  // const [transactions, setTransactions] = useState();

  // console.log(categories[0]._id, 'categories[0]._id');

  const resetCategory = () => {
    setChartsData([]);
    setCurrentCategory([]);
  };

  const handleTypeChange = () => {
    dispatch(updateType(isExpenseCategory));
    resetCategory();
  };

  const handleCategoryClick = (id, value) => {
    setCurrentCategory(value);
    setChartsData(transactions[id].report);
    // console.log(categories[0]._id, 'setCurrentCategory(categories[0]._id)');
    // console.log(categories[id].report, 'categories[id]');
  };

  // console.log(transactions, 'transactions');
  // if (isLoading) return <h1>Loading</h1>;

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
            onClick={handleTypeChange}
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
          <p className={s.switchTitle}>{isExpenseTitle}</p>
          <button
            type="button"
            onClick={handleTypeChange}
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

        {!!error && <h2 className={s.error}>{t('noTransactions')}</h2>}
        {isLoading ? (
          <h2 className={s.loading}>{t('loading')}</h2>
        ) : (
          <ul className={s.categories}>
            {transactions.map(({ totalCategoriesSum, _id: category }, id) => {
              return (
                <li key={category} className={s.category}>
                  <p className={s.categoryValue}>{t(category)}</p>
                  <button
                    type="button"
                    className={
                      currentCategory === category
                        ? s.categoryBtnActive
                        : s.categoryBtn
                    }
                    onClick={() => handleCategoryClick(id, category)}
                  >
                    <IconSvg
                      sprite={svgSprite}
                      icon={category}
                      className={s.categoryIcon}
                    />
                  </button>
                  <span
                    className={
                      currentCategory === category
                        ? s.categoryBackgroundActive
                        : s.categoryBackground
                    }
                  />
                  <p className={s.categoryName}>
                    {formatSum(totalCategoriesSum)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className={s.chartsWrapper}>
        <Charts />
      </div>

      {/* <ul>
        {!!chartsData &&
          chartsData.map(
            ({ totalDescriptionSum: sum, _id: { description } }) => {
              // console.log(sum, 'transactions totalDescriptionSum ');
              // console.log(description, 'transactions totalDescriptionSum ');
              return <li key={description}>{description + ' ' + sum}</li>;
            }
          )}
      </ul> */}
    </>
  );
};

export default Reports;
