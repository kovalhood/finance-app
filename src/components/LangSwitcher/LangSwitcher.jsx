import { useTranslation } from 'react-i18next';
import styles from './LangSwitcher.module.scss';

const languages = { en: 'English', uk: 'Ukrainian' };

const LangSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.wrapper}>
      {Object.keys(languages).map(lng => {
        return (
          <button
            className={styles.switchBtn}
            key={lng}
            onClick={() => {
              i18n.changeLanguage(lng);
            }}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
};

export default LangSwitcher;
