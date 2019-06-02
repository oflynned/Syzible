import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Tearma from "./screens/tearma/tearma";
import IrishRail from "./screens/irishRail/irishRail";
import PageNotFound from "./screens/common/pageNotFound";

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/tearma" component={Tearma}/>
            <Route exact path="/irish-rail" component={IrishRail}/>
            <Route component={PageNotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
