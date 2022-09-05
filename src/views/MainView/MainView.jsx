import styles from './MainView.module.css';
import { Background } from '../../components/UI/Background';
import { Dashboard } from '../../components/Dashboard';
import { TempForm } from '../../components/TempForm';

const MainView = () => {
  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <TempForm />
      <Dashboard />
    </>
  );
};
export default MainView;
