import styles from "./NotFoundView.module.css";
import { Background } from "../../components/UI/Background";

const NotFoundView = () => {
  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <h4 className={styles.title}>We are sorry, but page not found ...</h4>
    </>
  );
};
export default NotFoundView;
