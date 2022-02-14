import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

import { Home } from "./pages/home";
import Login from "./pages/login";
import { Profile } from "./pages/profile";
import { Search } from "./pages/search";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div className="d-flex flex-column h-100">
      <Router history={history} basename={basename}>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/profile/:id" component={Profile} />
          <ProtectedRoute path="/search/:user" component={Search} />
          <Route path="*">
            <div className="page404">
              <h5>404</h5>
              <h5>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h5>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Layout;
