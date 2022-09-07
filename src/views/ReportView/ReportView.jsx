import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
// import { Background } from '../../components/UI/Background';
import { Charts, GoBackButton, MonthPicker, Reports } from '../../components';
import styles from './ReportView.module.scss';
import { Container } from '../../components/UI/Container';
import { isMobile } from '../../utils/mediaQuery';
import { LangSwitcher } from '../../components/LangSwitcher/';
import { Balance } from '../../components/Balance';

const finance = { expenses: 20000, incomes: 50000 };

const ReportView = () => {
  const { t } = useTranslation();
  const Mobile = isMobile(useMediaQuery);

  return (
    <Container>
      <LangSwitcher />

      <div className={styles.btn}>
        <GoBackButton />
      </div>
      <Balance></Balance>
      <MonthPicker />

      <div className={styles.reportViewWrapper}>
        {/* <div className={styles.backgroundContainer}>
        <Background />
      </div> */}

        <Reports
          finance={finance}

          // // categories={categories}
          // handleTypeChange={handleTypeChange}
          // type={type}
          // transactions={transactions}
        />
      </div>
    </Container>
  );
};
export default ReportView;
