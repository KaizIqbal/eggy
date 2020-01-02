import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeComponent, LoginComponent } from "./components";
const App = () => (
  <Fragment>
    <Router>
      <Switch>
        <Route exact path="/" component={HomeComponent}></Route>
        <Route path="/login" component={LoginComponent}></Route>
      </Switch>
    </Router>
  </Fragment>
);

export default App;
