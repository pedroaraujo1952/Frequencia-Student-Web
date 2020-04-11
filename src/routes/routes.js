import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import Error404 from "../errors/Error404/404";
import PrivateRoute from "./privateRoutes";

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/" component={Home} />
      <Route path="*" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default routes;
