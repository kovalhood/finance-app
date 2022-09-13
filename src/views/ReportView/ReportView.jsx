import { useMediaQuery } from 'react-responsive';
// import { Background } from '../../components/UI/Background';
import { GoBackButton, MonthPicker, Reports } from '../../components';
import { Container } from '../../components/UI/Container';
import { isTablet } from '../../utils/mediaQuery';
import { BalanceInput } from '../../components/Balance/BalanceInput';

import styles from './ReportView.module.scss';
const ReportView = () => {
  const Tablet = isTablet(useMediaQuery);

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.btn}>
          <GoBackButton />
        </div>
        <div className={styles.balance}>
          <BalanceInput isReportsVariant={Tablet} />
        </div>
        <MonthPicker />
      </div>

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
