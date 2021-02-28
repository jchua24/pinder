import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";

import "./components/Footer"
import Footer from "./components/Footer";
import Login from "./components/Login"; 
import Intro from "./components/Intro";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>
          <Navigation />
          <hr />
          <Switch>
            <Route exact path="/">
              <Intro />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
