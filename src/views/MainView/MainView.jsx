import styles from "./MainView.module.css";
import { Background } from "../../components/UI/Background";
import { Dashboard } from "../../components/Dashboard";

const MainView = () => {
  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <Dashboard />
    </>
  );
};
export default MainView;
