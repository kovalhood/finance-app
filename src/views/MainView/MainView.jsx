import styles from './MainView.module.css';
import { Background } from '../../components/UI/Background';
import { Dashboard } from '../../components/Dashboard';
import { Balance } from '../../components/Balance';

const MainView = () => {
  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <Balance />
      <Dashboard />
    </>
  );
};
export default MainView;
