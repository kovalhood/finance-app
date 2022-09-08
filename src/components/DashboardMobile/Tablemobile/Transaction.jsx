import PropTypes from 'prop-types';
import { RedactSvgSelector } from './RedactSvgSelector.jsx';
import { useDispatch } from 'react-redux';
import operation from '../../../redux/operation/authOperations';

import styles from './TableMobile.module.scss';

const Transaction = ({ id, date, description, category, sum, income }) => {
  const dispatch = useDispatch();
  const value = sum;
  const isIncome = income;

  if (value) {
    return (
      <li className={styles.transaction}>
        <p className={styles.transaction_description}>{description}</p>
        <div className={styles.flex}>
          <p className={styles.transaction_date}>{date}</p>
          <p className={styles.transaction_category}>{category}</p>
        </div>
        {isIncome && <p className={styles.green_color}>{sum}.00 uah</p>}
        {!isIncome && <p className={styles.red_color}>-{sum}.00 uah</p>}

        <button
          type="button"
          onClick={() => dispatch(operation.deleteTransaction({ id }))}
          className={styles.button}
        >
          <RedactSvgSelector id="delete" />
        </button>
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
