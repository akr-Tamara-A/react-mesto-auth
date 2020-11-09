import React from "react";
import "./App.css";
import Header from "../Header/Header";
import MainPage from "../../pages/MainPage";
import Footer from "../Footer/Footer";


/** Основной компонент страницы */
function App() {
  

  /** Основная разметка */
  return (
    <div className="page__container">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
