import styles from './Container.module.scss';

const Container = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Container;

// import styles from './Container.module.scss';

// const Container = ({ children }) => {
//   return (
//     <div className={styles.background}>
//       <div className={styles.layout}>{children}</div>
//     </div>
//   );
// };

// export default Container;
