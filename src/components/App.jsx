import { MainView } from "../views/MainView/MainView";
import { Loader } from "./Loader/Loader";
import { Header } from "./Header/Header";
import "../CSS/normilize.css";
import "../CSS/fonts.css";

export const App = () => {
  return (
    <>
      <Header />
      <MainView />
    </>
  );
};
