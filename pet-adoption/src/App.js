import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import "./components/Footer/Footer";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Intro from "./components/Intro/Intro";
import Navigation from "./components/Navigation";
import SignUp from "./components/Signup/Signup";
import About from "./components/About";
import Applications from "./components/Applications/Applications";
import PetPosting from "./components/PetPosting/PetPosting";
import Profile from "./components/Profile/Profile";
import PetSwiper from "./components/PetSwiper/PetSwiper";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navigation />
          <div className="appContent">
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
              <Route path="/postapet">
                <PetPosting clinic="test" />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/swiper">
                <PetSwiper />
              </Route>
            </Switch>
          </div>
          {/* <div className="footerContainer">
            <Footer />
          </div> */}
        </Router>
      </div>
    );
  }
}

export default App;
