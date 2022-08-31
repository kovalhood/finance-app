import { MainView } from "../views/MainView";
// import { Loader } from "./Loader";
import { Header } from "./Header/Header";
import { SummaryTrans } from "./SummaryTrans/SummaryTrans";
import "../CSS/normilize.css";
import "../CSS/fonts.css";

export const App = () => {
  return (
    <>
      <Header />
      <SummaryTrans />
      <MainView />
    </>
  );
};
