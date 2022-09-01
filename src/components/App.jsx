import { Loader } from "./Loader";
import { Header } from "./Header/Header";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "../Routes/PrivateRoute";

import "../CSS/normilize.css";
import "../CSS/fonts.css";
// import { Balance } from "./Balance/Balance";
// import { SummaryTrans } from "./SummaryTrans/SummaryTrans";

const HomeView = lazy(() => import("../views/HomeView/HomeView"));
const MainView = lazy(() => import("../views/MainView/MainView"));
const ReportView = lazy(() => import("../views/ReportView/ReportView"));
const NotFoundView = lazy(() => import("../views/NotFoundView/NotFoundView"));

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/auth" element={<HomeView />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                component={
                  <Suspense fallback={<Loader />}>
                    <MainView />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute
                component={
                  <Suspense fallback={<Loader />}>
                    <ReportView />
                  </Suspense>
                }
              />
            }
          />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </>
    // <>
    //   <Header />
    //   <Balance />
    //   <SummaryTrans />
    //   <MainView />
    // </>
  );
};
