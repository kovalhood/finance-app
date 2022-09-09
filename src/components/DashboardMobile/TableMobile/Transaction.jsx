import PropTypes from 'prop-types';
import { RedactSvgSelector } from './RedactSvgSelector.jsx';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import operation from '../../../redux/operation/authOperations';

import styles from './TableMobile.module.scss';

const Transaction = ({ id, date, description, category, sum, income }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const value = sum;
  const isIncome = income;

  if (value) {
    return (
      <li className={styles.transaction}>
        <div className={styles.left_group}>
          <p className={styles.transaction_description}>
            {t(`${description}`)}
          </p>
          <div className={styles.flex}>
            <p className={styles.transaction_date}>{date}</p>
            <p className={styles.transaction_category}>{t(`${category}`)}</p>
          </div>
        </div>
        <div className={styles.rigth_group}>
          {isIncome && (
            <p className={styles.green_color}>
              {sum}.00 {t('hrn')}
            </p>
          )}
          {!isIncome && (
            <p className={styles.red_color}>
              -{sum}.00 {t('hrn')}
            </p>
          )}

          <button
            type="button"
            onClick={() => dispatch(operation.deleteTransaction({ id }))}
            className={styles.button}
          >
            <RedactSvgSelector id="delete" />
          </button>
        </div>
      </li>
    );
  }
};

Transaction.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  sum: PropTypes.number,
  income: PropTypes.bool,
};

export default Transaction;
