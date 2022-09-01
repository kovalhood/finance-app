import styles from "./ReportView.modulee.css";
import { Background } from "../../components/UI/Background";

const ReportView = () => {
  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <h4 className={styles.title}>
        We are sorry, but page with Dashboard at the moment under construction
      </h4>
    </>
  );
};
export default ReportView;
