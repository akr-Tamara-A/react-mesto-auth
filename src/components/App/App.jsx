import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// import "./App.css";

import MainPage from "../../pages/MainPage";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import ProtectedRoute from "../../hocs/ProtectedRoute";

/** Основной компонент страницы */
function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  /** Основная разметка */
  return (
    <BrowserRouter>
      <div className="page__container">
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} path="/mesto-react" component={MainPage} />
          <Route path="/sign-up" component={Register} />
          <Route path="/sign-in" component={Login} />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/mesto-react" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
