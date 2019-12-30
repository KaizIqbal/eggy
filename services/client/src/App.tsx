import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeComponent } from "./components";
const App = () => (
  <Fragment>
    <Router>
      <Switch>
        <Route path="/" component={HomeComponent}></Route>
      </Switch>
    </Router>
  </Fragment>
);

export default App;
