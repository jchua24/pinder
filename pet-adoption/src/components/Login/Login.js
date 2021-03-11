import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleSubmit(event) {
    event.preventDefault();
    let email = this.state.email,
      password = this.state.password;
    if (email === "test@test.com" && password === "test"){
      this.setState({ redirect: "/swiper" });
      global.isLoggedIn = 'true';
    }
    else if (email === "clinic@clinic.com" && password === "clinic")
      this.setState({ redirect: "/adminapps" });
    else alert("The email or password entered is incorrect!");
  }
  render() {
    if (this.state.redirect.length > 0)
      return <Redirect to={this.state.redirect} />;
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
