import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
// import { Background } from '../../components/UI/Background';
import { GoBackButton, Reports } from '../../components';
import styles from './ReportView.module.scss';
import { Container } from '../../components/UI/Container';
import { isMobile } from '../../utils/mediaQuery';
import { LangSwitcher } from '../../components/LangSwitcher/';

const finance = { expenses: 20000, incomes: 50000 };

const categories = [
  { id: '', name: 'products', svg: 'products', value: 573 },
  { id: '', name: 'cocktail', svg: 'cocktail', value: 1300 },
  { id: '', name: 'kite', svg: 'kite', value: 2567 },
  { id: '', name: 'book', svg: 'book', value: 500 },
  { id: '', name: 'clay', svg: 'clay', value: 1000 },
  { id: '', name: 'couch', svg: 'couch', value: 130 },
  { id: '', name: 'salary1', svg: 'salary1', value: 13350 },
  { id: '', name: 'invoice', svg: 'invoice', value: 10 },
  { id: '', name: 'tools', svg: 'tools', value: 32 },
  { id: '', name: 'ufo', svg: 'ufo', value: 12632 },
  { id: '', name: 'salary2', svg: 'salary2', value: 3632 },
];

const ReportView = () => {
  const { t } = useTranslation();

  const Mobile = isMobile(useMediaQuery);

  return (
    <Container>
      <LangSwitcher />

      <div className={styles.btn}>
        <GoBackButton />
        {!Mobile && <p className={styles.btnLabel}>{t('goBackBtn')}</p>}
      </div>
      {/* <h6>DatePicker</h6>
      <h6>Balance</h6> */}

      <div className={styles.reportViewWrapper}>
        {/* <div className={styles.backgroundContainer}>
        <Background />
      </div> */}
        <Reports finance={finance} categories={categories} />
      </div>
      {/* </div> */}
      {/* <h6>Charts</h6> */}
    </Container>
  );
};
export default ReportView;
