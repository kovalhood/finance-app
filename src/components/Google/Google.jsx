import styles from './Google.module.css';
import {useMediaQuery} from 'react-responsive';
import {isMobile} from "../../utils/mediaQuery";
import Button from 'react-bootstrap/Button';

export const Google = () => {
  const Mobile = isMobile(useMediaQuery);
  return (
    <>
      <p
        className={Mobile ? styles.topTextMobile : styles.topTextDefault}
      >
        Ви можете авторизуватися за допомогою облікового запису Google:
      </p>
      <Button
        className={styles.button}
        type="button"
      >
        <div className={styles.container}>
          <div className={styles.btnImg} />
          <span className={styles.btnLabel}>Google</span>
        </div>
      </Button>
      <p className={Mobile ? styles.bottomTextMobile : styles.bottomTextDefault}>
        Або зайти за допомогою e-mail та пароля, попередньо зареєструвавшись:
      </p>
    </>

  )

}
