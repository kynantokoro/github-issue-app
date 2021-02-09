import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container p-3">
          <div className="card card-body">
            <Switch>
              <Route exact path="/issues"></Route>
              <Route exact path="/"></Route>
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/issues/:number"></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
