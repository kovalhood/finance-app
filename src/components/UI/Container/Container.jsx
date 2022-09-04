import styles from './Container.module.css';

const Container = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Container;
