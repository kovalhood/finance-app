import { MainView } from "../views/MainView";
import { Loader } from "./Loader";
import { Header } from "./Header/Header";
import { Balance } from "./Balance/Balance";
import "../CSS/normilize.css";
import "../CSS/fonts.css";

export const App = () => {
  return (
    <>
      <Balance />
      {/* <Header />
      <MainView /> */}
    </>
  );
};
