import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
class Intro extends React.Component {
  constructor() {
      super();
  }
  render() {
    return (
        <div id="intro">
        </div>
    );
  }
}

export default Intro;

// should this page include the routing to login and sign up or App?
