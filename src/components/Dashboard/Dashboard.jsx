import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Controls from "./Controls";
import { Loader } from "../Loader";
import styles from "./Dashboard.module.scss";
import PrivateRoute from "../../Routes/PrivateRoute";

export const Dashboard = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.controls}>
          <Controls link={"/expense"} title={"Expense"} />
          <Controls link={"/income"} title={"Income"} />
        </div>
        <div className={styles.board}>
          <h4 className={styles.title}></h4>
        </div>
        <Routes>
          <Route
            path="/reports"
            element={
              <PrivateRoute
                component={<Suspense fallback={<Loader />}></Suspense>}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};
