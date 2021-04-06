import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import ENV from "../config.js";

import "./Login.css";


const API_HOST = ENV.api_host;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.history.push('/login');
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleSubmit(event) {
    event.preventDefault();
    const req = new Request(`${API_HOST}/auth/login`, {
      method: 'post',
      body: JSON.stringify(this.state),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
    // fetch the request
    fetch(req)
      .then(res => {
        if (res.status === 200)
          return res.json();
      })
      .then(json => {
        // check if the returned values are not null
        if (json.id !== undefined && json.user !== undefined)
          this.props.app.setState({ currUser : json.user });
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group
            style={{ color: "" }}
            size="lg"
            controlId="formGroupEmail"
          >
            <Form.Label className="loginLabel">Email</Form.Label>
            <Form.Control
              // style={{backgroundColor: '#5bc0de'}}
              autoFocus
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group
            style={{ color: "" }}
            size="lg"
            controlId="formGroupPassword"
          >
            <Form.Label className="loginLabel">Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>
          <a href="/signup">click here to sign up</a>
          <Button
            block
            style={{ backgroundColor: "#429EA6", borderColor: "transparent" }}
            size="lg"
            type="submit"
            disabled={!this.validateForm()}
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
