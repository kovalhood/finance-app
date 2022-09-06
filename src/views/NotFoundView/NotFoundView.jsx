import styles from './NotFoundView.module.css';
import { Background } from '../../components/UI/Background';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authOperations } from '../../redux/operation';
import { useEffect } from 'react';

const NotFoundView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.search.slice(7);

  dispatch(authOperations.loginWithGoogle(token)).then(res => {
    const { payload: data } = res;
    navigate('/expense');
  });
  useEffect(() => {
    navigate('/auth');
  }, []);

  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <h4 className={styles.title}>Please wait... login in progress</h4>
      {/*<h4 className={styles.title}>We are sorry, but page not found ...</h4>*/}
    </>
  );
};
export default NotFoundView;
