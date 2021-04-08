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
      currUser: null
    }
  }

  // check to see if the user has logged in
  async componentDidMount() {

    try {
      const data = await apiCheckSession();
      if(data) {
        this.setState({currUser: data.user}); 
      }
    } catch (error) {
      console.log(error); 
    } 
    
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Navigation app={this}/>
          <div className="appContent">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <div>
                    {this.state.currUser ? (
                      this.state.currUser.admin ? (
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
                path="/intro"
                render={(props) => (
                  <div>
                    <Intro {...props} app={this} />
                  </div>
                )}
              />
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
              <Route
                path="/signup"
                render={(props) => (
                  <div>
                    <SignUp {...props} app={this} />
                  </div>
                )}
              />
              <Route path="/about">
                <About />
              </Route>
              <Route
                path="/applications"
                render={(props) => (
                  <div>
                    <Applications {...props} app={this} />
                  </div>
                )}
              />
              <Route path="/postapet">
                <PetPosting clinic="test" />
              </Route>
              <Route 
                path="/profile"
                render={(props) => (
                  this.state.currUser ? (
                    <Profile {...props} app={this} />
                  ) : (
                    <Login {...props} app={this} />
                  )
                )}
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
                path="/adminapps"
                render={(props) => (
                  <div>
                    <AdminApplications {...props} app={this} />
                  </div>
                )}
              />
              <Route 
                path="/questionnaire"
                render={(props) => (
                  <div>
                    <Questionnaire {...props} app={this} />
                  </div>
                )}
              />
              <Route
                path="/logout"
                render={(props) => (
                  <div>
                    <Logout {...props} app={this} />
                  </div>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
