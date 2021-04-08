import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import "./components/Footer/Footer";
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
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Logout from "./components/Logout";
import { apiCheckSession } from "./api/auth";

class App extends React.Component {
  constructor(props) {
    super();

    //state object, to be accessible by children elements
    this.state = {
      currUser: null,
    };
  }

  // check to see if the user has logged in
  async componentDidMount() {
    try {
      const data = await apiCheckSession();
      if (data) {
        this.setState({ currUser: data.user });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { currUser } = this.state;
    console.log('Rendering');
    console.log(currUser);
    return (
      <Router>
        <div className="App">
          <Navigation app={this} />
          <div className="appContent">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <div>
                    {currUser ? (
                      currUser.admin ? (
                        <AdminApplications {...props} app={this} />
                      ) : (
                        <PetSwiper {...props} app={this} />
                      )
                    ) : (
                      <Intro {...props} app={this} />
                    )}
                  </div>
                )}
              />
              {/* add a path that will always take user to the intro page */}
              <Route
                exact
                path="/intro"
                render={(props) => (
                  <div>
                    <Intro {...props} app={this} />
                  </div>
                )}
              />
              <Route
                exact
                path="/login"
                render={(props) => (
                  <div>
                    {!currUser ? (
                      <Login {...props} app={this} />
                    ) : (
                      <Intro {...props} app={this} />
                    )}
                  </div>
                )}
              />
              <Route
                exact
                path="/signup"
                render={(props) => (
                  <div>
                    <SignUp {...props} app={this} />
                  </div>
                )}
              />
              <Route exact path="/about">
                <About />
              </Route>
              <Route
                exact
                path="/applications"
                render={(props) => (
                  <div>
                    <Applications {...props} app={this} />
                  </div>
                )}
              />
              <Route exact path="/postapet">
                <PetPosting clinic="test" />
              </Route>
              <Route
                exact
                path="/profile"
                render={(props) =>
                  currUser ? (
                    <div><Profile {...props} app={this} /></div>
                  ) : (
                    <div><Login {...props} app={this} /></div>
                  )
                }
              />
              <Route
                path="/swiper"
                render={(props) => (
                  <div>
                    <PetSwiper {...props} app={this} />
                  </div>
                )}
              />
              <Route
                exact
                path="/adminapps"
                render={(props) =>
                  currUser ? (
                    currUser.admin ? (
                      <div>
                        {" "}
                        <AdminApplications {...props} app={this} />{" "}
                      </div>
                    ) : (
                      <div>You are not an admin user!</div>
                    )
                  ) : (
                    <div>You need to login first.</div>
                  )
                }
              />
              <Route
                exact
                path="/questionnaire"
                render={(props) => (
                  <div>
                    <Questionnaire {...props} app={this} />
                  </div>
                )}
              />
              <Route
                exact
                path="/logout"
                render={(props) => (
                  <div>
                    <Logout {...props} app={this} />
                  </div>
                )}
              />
              {/* 404 if the URL cannot be found */}
              <Route render={() => <div>404 URL Not Found.</div>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
