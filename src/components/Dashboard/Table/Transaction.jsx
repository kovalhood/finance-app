import PropTypes from 'prop-types';
import { RedactSvgSelector } from './RedactSvgSelector.jsx';
import { useDispatch } from 'react-redux';
import operetion from '../../../redux/operation/authOperations';
// import sprite from '../../../images/sprite.svg';
import styles from './Table.module.scss';

const Transaction = ({ id, date, description, category, sum, income }) => {
  const dispatch = useDispatch();
  const value = sum;
  const isIncome = income;

  if (value) {
    if (isIncome) {
      return (
        <tr>
          <td>{date}</td>
          <td>{description}</td>
          <td>{category}</td>
          <td className={styles.green_color}>{sum}.00 uah</td>
          <td>
            <button
              type="button"
              onClick={() => dispatch(operetion.deleteTransaction({ id }))}
              className={styles.button}
            >
              <RedactSvgSelector id="delete" />
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td>{date}</td>
        <td>{description}</td>
        <td>{category}</td>
        <td className={styles.red_color}>- {sum}.00 uah</td>
        <td>
          <button
            type="button"
            onClick={() => dispatch(operetion.deleteTransaction({ id }))}
            className={styles.button}
          >
            <RedactSvgSelector id="delete" />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className={styles.emtyLine}>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td></td>
      <td></td>
    </tr>
  );
};

Transaction.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  sum: PropTypes.number,
};

export default Transaction;
