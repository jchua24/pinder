import React from "react";
import {Form, Button} from "react-bootstrap";
import {Redirect, useHistory} from "react-router-dom";

import "./SubmitApp.css";
import Applications from "../Applications/Applications"

class SubmitApp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comments: "",
      redirect: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this); 
  }
  handleSubmit (event){
    event.preventDefault();
    alert("submit! (no effect)");
    /* Addition of pets to applications is NOT working
    const newapp = {
      name: "Big Boi", 
      type: "Dog", 
      breed: "Samoyed", 
      imgSrc: "/bigb.jpg", 
      addInfo: "Huge doggo", 
      comments: "He looks very fluffly! I'm in."
    }
    super.state.apps.push(newapp)
    super.setState({super.state.apps})*/
    this.setState({redirect: "/applications"});
  }
  render() {
    if (this.state.redirect.length > 0)
      return <Redirect to={this.state.redirect} />
    return (
      <div className = "SubmitApp">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group size="lg" controlId="formComments">
                    <Form.Label /*className="loginLabel"*/>Say something to the Clinic</Form.Label>
                    <Form.Control
                        autoFocus
                        type="comments"
                        placeholder="Comments"
                        value={this.state.comments}
                        onChange={(e) => this.setState({comments: e.target.value})}
                    />
                </Form.Group>
                <Button block type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
  }
}

export default SubmitApp;
