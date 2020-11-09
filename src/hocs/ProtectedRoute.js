import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  return props.loggedIn ? <Route path={props.path} component={props.component}/> : <Redirect to="/sign-in" />
}

export default ProtectedRoute;