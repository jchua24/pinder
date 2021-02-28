import React from "react";

import logo from "./logo.svg";
import "./App.css";
import "./components/Footer"
import Footer from "./components/Footer";
import Login from "./components/Login"; 
import Intro from "./components/Intro";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Intro />
        <Footer/>
      </div>
    );
  }
}

export default App;
