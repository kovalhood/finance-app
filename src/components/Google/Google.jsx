import styles from "./Google.module.css";
import { useMediaQuery } from "react-responsive";
import { isMobile } from "../../utils/mediaQuery";
import Button from "react-bootstrap/Button";
import { ReactComponent as GoogleIcon } from "../../images/icons/GoogleIconBtn.svg";

export const Google = () => {
  const Mobile = isMobile(useMediaQuery);
  return (
    <>
      <p className={Mobile ? styles.topTextMobile : styles.topTextDefault}>
        Ви можете авторизуватися за допомогою облікового запису Google:
      </p>
      <Button className={styles.button} type="button">
        <a
          className={styles.container}
          href="http://localhost:3000/api/auth/google"
        >
          <GoogleIcon />
          <span className={styles.btnLabel}>Google</span>
        </a>
      </Button>
      <p
        className={Mobile ? styles.bottomTextMobile : styles.bottomTextDefault}
      >
        Або зайти за допомогою e-mail та пароля, попередньо зареєструвавшись:
      </p>
    </>
  );
};
