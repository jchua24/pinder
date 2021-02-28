import React from "react";

import {Form, Button} from "react-bootstrap";

class Login extends React.Component{
  constructor(props) {
      super();
      this.state = {
          email: "",
          password: ""
      }
  }
  validateForm(){
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleSubmit(event){
    event.preventDefault();
  }
  render() {
    return (
        <div className = "Login">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
  }
}

export default Login;