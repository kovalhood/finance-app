import styles from './MainView.module.css';
import { Background } from '../../components/UI/Background';
import { Dashboard } from '../../components/Dashboard';
import { Balance } from '../../components/Balance';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/operation';
import { useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const MainView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser())
      .unwrap()
      .catch(() => {
        Notify.warning(
          'Sorry, your authorization token expired, please re-login',
          {}
        );
        dispatch(authOperations.logOut());
      });
  }, [dispatch]);
  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <Balance />
      <Dashboard />
    </>
  );
};
export default MainView;
