import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";

import "./components/Footer/Footer"
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login"; 
import Intro from "./components/Intro/Intro";
import Navigation from "./components/Navigation";
import SignUp from "./components/Signup/Signup";
import About from "./components/About";
import Pet from "./components/Pet";
import Applications from "./components/Applications/Applications";
import SubmitApp from "./components/SubmitApp/SubmitApp"

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>
          <Navigation />
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
            <Route path="/about">
              <About />
            </Route>
            <Route path="/applications">
              <Applications />
            </Route>
            <Route path="/submitapp">
              <SubmitApp />
            </Route>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
