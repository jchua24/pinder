import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Alert } from "react-bootstrap";
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
import PostSwiper from "./components/PostSwiper/PostSwiper";
import AdminApplications from "./components/AdminApplications/AdminApplications";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import QuestionnaireAdmin from "./components/Questionnaire/QuestionnaireAdmin";
import Logout from "./components/Logout";
import { apiCheckSession } from "./api/auth";

class App extends React.Component {
  constructor(props) {
    super();

    //state object, to be accessible by children elements
    this.state = {
      currUser: null,
      isMounted: false,
    };
  }

  // check to see if the user has logged in
  async componentDidMount() {
    try {
      const data = await apiCheckSession();
      if (data) {
        this.setState({ currUser: data.user, isMounted: true });
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("isLoggedIn");
      this.setState({ isMounted: true });
    }
  }

  isValid() {
    let { currUser, isMounted } = this.state,
      isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn && !currUser) return false;
    return true;
  }

  render() {
    let { currUser, isMounted } = this.state;
    return this.isValid() ? (
      <Router>
        <div className="App">
          <Navigation app={this} />
          <div className="appContent">
            <Switch>
              <Route
                exact
                path={["/", "/intro"]}
                render={(props) => (
                  <div>
                    {currUser ? (
                      currUser.admin ? (
                        <Redirect to={{ pathname: "/adminapps" }} />
                      ) : (
                        <Redirect to={{ pathname: "/swiper" }} />
                      )
                    ) : (
                      <Intro {...props} app={this} />
                    )}
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
                      <div>
                        <Alert variant="primary" dismissible transition>
                          You have already logged in.
                        </Alert>
                        {currUser.admin ? (
                          <Redirect to={{ pathname: "/adminapps" }} />
                        ) : (
                          <Redirect to={{ pathname: "/swiper" }} />
                        )}
                      </div>
                    )}
                  </div>
                )}
              />
              <Route
                exact
                path="/signup"
                render={(props) => (
                  <div>
                    {!currUser ? (
                      <SignUp {...props} app={this} />
                    ) : (
                      <div>
                        <Alert variant="primary" dismissible transition>
                          You have already logged in.
                        </Alert>
                        {currUser.admin ? (
                          <Redirect to={{ pathname: "/swiper" }} />
                        ) : (
                          <Redirect to={{ pathname: "/adminapps" }} />
                        )}
                      </div>
                    )}
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
                    {currUser ? (
                      currUser.admin ? (
                        <Redirect to={{ pathname: "/adminapps" }} />
                      ) : (
                        <Applications {...props} app={this} />
                      )
                    ) : (
                      <div>
                        <Alert variant="primary" dismissible transition>
                          You need to login to access this page.
                        </Alert>
                        <Redirect to={{ pathname: "/login" }} />
                      </div>
                    )}
                  </div>
                )}
              />
              <Route
                exact
                path="/postapet"
                render={(props) => (
                  <div>
                    {currUser ? (
                      currUser.admin ? (
                        <PetPosting {...props} app={this} />
                      ) : (
                        <div>This page is only accessible to clinics!</div>
                      )
                    ) : (
                      <Redirect to={{ pathname: "/login" }} />
                    )}
                  </div>
                )}
              />
              <Route
                exact
                path="/profile"
                render={(props) =>
                  currUser ? (
                    <div>
                      <Profile {...props} app={this} />
                    </div>
                  ) : (
                    <div>
                      <Login {...props} app={this} />
                    </div>
                  )
                }
              />
              <Route
                path="/swiper"
                render={(props) => (
                  <div>
                    {currUser ? (
                      currUser.admin ? (
                        <div>
                          This page is only accessible to individuals looking
                          for pets.
                          <br />
                          Please login using your personal account.
                        </div>
                      ) : (
                        <PostSwiper {...props} app={this} />
                      )
                    ) : (
                      <Redirect to={{ pathname: "/login" }} />
                    )}
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
                    <Redirect pathname={{ to: "/login" }} />
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
                path="/userqs"
                render={(props) =>
                  this.currUser ? (
                    this.currUser.admin ? (
                      <QuestionnaireAdmin {...props} app={this} />
                    ) : (
                      <div>You need to be an admin to view this page.</div>
                    )
                  ) : (
                    <Redirect to={{ pathname: "/login" }} />
                  )
                }
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
    ) : (
      ""
    );
  }
}

export default App;
