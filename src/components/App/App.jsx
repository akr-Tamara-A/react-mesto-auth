import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import MainPage from "../../pages/MainPage";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import ProtectedRoute from "../../hocs/ProtectedRoute";
import InfoTooltip from "../InfoTooltip";

import * as auth from '../../Auth.js';

/** Основной компонент страницы */
function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setUserData(res.data);
          setLoggedIn(true);
          history.push("/mesto-react");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLogin = () => {
    tokenCheck();
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleOnSubmit = (booleen) => {
    setIsOpen(true);
    setIsSuccess(booleen);
  };

  /** Основная разметка */
  return (
    <>
      <div className="page__container">
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} path="/mesto-react">
            <MainPage userData={userData} />
          </ProtectedRoute>
          <Route path="/signup" >
            <Register isSuccess={handleOnSubmit} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/mesto-react" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </div>
      <InfoTooltip isOpen={isOpen} isSuccess={isSuccess} onClose={handleClose} />
    </>
  );
}

export default App;
