import ControlsMobile from './ControlsMobile';
import FormMobile from './FormMobile';
import styles from './DashboardMobile.module.scss';

export const DashboardMobile = () => {
  console.log('mobile');
  return (
    <>
      <div className={styles.container}>
        <FormMobile />
      </div>
    </>
  );
};
