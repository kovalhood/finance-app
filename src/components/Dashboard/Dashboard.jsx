import Controls from './Controls';
import Form from './Form';
import { HeaderTable } from './Table/HeaderTable';
import Table from './Table';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.dashboard}>
          <div className={styles.controls}>
            <Controls link={'/expense'} title={'Expense'} />
            <Controls link={'/income'} title={'Income'} />
          </div>
          <div className={styles.board}>
            <Form />
            <HeaderTable />
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};
