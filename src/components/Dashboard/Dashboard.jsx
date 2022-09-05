import Controls from './Controls';
import Form from './Form';
import Table from './Table/Table';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.controls}>
          <Controls link={'/expense'} title={'Expense'} />
          <Controls link={'/income'} title={'Income'} />
        </div>
        <div className={styles.board}>
          <Form />
          <div className={styles.tableContainer}>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};
