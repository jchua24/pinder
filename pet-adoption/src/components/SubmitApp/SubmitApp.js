import React from "react";
import {Form, Button} from "react-bootstrap";

import "./SubmitApp.css";

class SubmitApp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comments: ""
    }
  }
  handleSubmit (event){
    event.preventDefault();
    alert("submit!");
  }
  render() {
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
