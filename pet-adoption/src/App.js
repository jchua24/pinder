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
import AdminApplications from "./components/AdminApplications/AdminApplications";

import ENV from "config.js";
const API_HOST = ENV.api_host;

class App extends React.Component {
  // check to see if the user has logged in
  componentDidMount() {
    fetch(`${API_HOST}/check-session`)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((json) => {
        if (json && json.currUser) this.setState({ currUser: json.currUser });
      })
      .catch((err) => console.log(err));
  }

  // global state that is going to be passed down
  state = {
    currUser: null,
  };

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
              <Route
                path="/login"
                render={(props) => (
                  <div>
                    {!this.state.currUser ? (
                      <Login {...props} app={this} />
                    ) : (
                      <Intro {...props} app={this} />
                    )}
                  </div>
                )}
              />
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
              <Route path="/adminapps">
                <AdminApplications />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
