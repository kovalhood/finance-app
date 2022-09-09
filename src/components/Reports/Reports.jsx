import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconSvg } from '../UI';
import { Charts } from '../Charts';
import svgSprite from '../../images/sprite.svg';
import {
  getTransactions,
  getType,
  getData,
  getError,
  getDate,
  getIsLoading,
  updateType,
  getTotalSumValue,
  getTotalSum,
} from '../../redux/reports';
import { formatSum } from '../../utils/formSum';
import s from './Reports.module.scss';

const finance = { expenses: 20000, incomes: 50000 };

const Reports = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [currentCategory, setCurrentCategory] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  const transactions = useSelector(getTransactions);
  const type = useSelector(getType);
  const date = useSelector(getDate);
  const error = useSelector(getError);
  const totalSumValue = useSelector(getTotalSumValue);
  const isLoading = useSelector(getIsLoading);

  const isExpenseCategory = type === 'expense' ? 'income' : 'expense';
  const isExpenseTitle =
    type === 'expense' ? t('reportsExpenses') : t('reportsIncomes');
  const isDateExist = Object.keys(date).length;

  const memoTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return b.totalCategoriesSum - a.totalCategoriesSum;
    });
    // return transactions.sort((a, b) => {
    //   return b.totalCategoriesSum - a.totalCategoriesSum;
    // });
  }, [transactions]);

  // console.log(memoTransactions, '-------memo');
  // console.log(transactions, 'transactions');

  // console.log(date, '---------------date');
  // console.log(transactions, 'transactions');
  // console.log(type, 'type');
  // console.log(chartsData, 'chartsData');
  // console.log(currentCategory, 'currentCategory');
  console.log(totalSumValue, 'totalSumValue');

  const getTransactionsData = useCallback(async () => {
    try {
      if (Object.keys(date).length) {
        const { year, month } = date;
        const normalizeMonth =
          month.toString().length === 1 ? '0' + month : month;

        await dispatch(getData({ type, normalizeMonth, year })).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  }, [date, dispatch, type]);

  const getTotalSumData = useCallback(async () => {
    try {
      if (Object.keys(date).length) {
        const { year, month } = date;
        const normalizeMonth =
          month.toString().length === 1 ? '0' + month : month;
        dispatch(getTotalSum({ normalizeMonth, year }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [date, dispatch]);

  useEffect(() => {
    getTransactionsData();
  }, [getTransactionsData]);

  useEffect(() => {
    getTotalSumData();
  }, [getTotalSumData]);

  useEffect(() => {
    resetCategory();
  }, [date]);

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

    const list = transactions[id]?.report.map(
      ({ totalDescriptionSum, _id: { description } }) => {
        return { sum: totalDescriptionSum, category: description };
      }
    );

    setChartsData(list);
    // console.log(categories[0]._id, 'setCurrentCategory(categories[0]._id)');
    // console.log(categories[id].report, 'categories[id]');
  };

  const arr = [
    { _id: false, totalSum: 666135 },
    { _id: true, totalSum: 717655 },
  ];

  // const ojb = arr.map(item => {
  //   return Object.values(item);
  // });
  // console.log(ojb, 'ojb');

  // const totalExpenses = totalSumValue[0]._id
  //   ? totalSumValue[0].totalSum
  //   : totalSumValue[1].totalSum;
  console.log(!!totalSumValue.length, 'totalSumValue.length');
  return (
    <>
      <div className={s.financeWrapper}>
        {/* <div className={s.expensesWrapper}>
          <p className={s.financeTitle}>{`${t('reportsExpenses') + ':'}`}</p>
          {!!totalSumValue.length ? (
            <p className={s.expenses}>{`- ${
              totalSumValue[0]._id
                ? totalSumValue[0].totalSum
                : totalSumValue[1].totalSum
            } ${t('hrn')}`}</p>
          ) : (
            <p className={s.expenses}>{`No expenses`}</p>
          )}
        </div>
        <span className={s.divider} />
        <div className={s.incomesWrapper}>
          <p className={s.financeTitle}>{`${t('reportsIncomes') + ':'}`}</p>
          <p className={s.incomes}>{`+ ${finance.incomes} ${t('hrn')}`}</p>
        </div> */}

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

        {!!error && <p className={s.error}>{t('noTransactions')}</p>}
        {isLoading ? (
          <p className={s.loading}>{t('loading')}</p>
        ) : (
          <ul className={s.categories}>
            {memoTransactions?.map(
              ({ totalCategoriesSum, _id: category }, id) => {
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
              }
            )}
          </ul>
        )}
      </div>
      {/* <>
        {!!chartsData.length && (
          <div className={s.chartsWrapper}>
            <Charts data={chartsData} />
          </div>
        )}
      </> */}
    </>
  );
};

export default Reports;
