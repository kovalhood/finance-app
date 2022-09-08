// import { useMediaQuery } from 'react-responsive';
// import { useTranslation } from 'react-i18next';
// import { Background } from '../../components/UI/Background';
import { GoBackButton, MonthPicker, Reports } from '../../components';
import styles from './ReportView.module.scss';
import { Container } from '../../components/UI/Container';
// import { isMobile } from '../../utils/mediaQuery';
import { LangSwitcher } from '../../components/LangSwitcher/';
import { BalanceInput } from '../../components/Balance/BalanceInput';

const ReportView = () => {
  // const { t } = useTranslation();
  // const Mobile = isMobile(useMediaQuery);

  return (
    <Container>
      <LangSwitcher />

      <div className={styles.btn}>
        <GoBackButton />
      </div>

      <BalanceInput />
      <MonthPicker />

      <div className={styles.reportViewWrapper}>
        {/* <div className={styles.backgroundContainer}>
        <Background />
      </div> */}

        <Reports />
      </div>
    </Container>
  );
};
export default ReportView;
