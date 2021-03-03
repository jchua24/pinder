import React from "react";
import { Form, Button, Col } from "react-bootstrap";

import "./Signup.css";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      address: "",
      city: "",
      province: "",
      postal: "",
      isClinic: ""
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.address.length > 0 &&
      this.state.city.length > 0 &&
      this.state.province !== "" &&
      this.state.postal.length > 0 &&
      this.state.clinic.length > 0
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("signup!");
  }

  render() {
    return (
      <div className="Signup">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              autoFocus
              type="text"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={this.state.city}
                onChange={(e) => this.setState({ city: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridProvince">
              <Form.Label>Province</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => this.setState({ province: e.target.value })}
              >
                <option selected value="">
                  Choose..
                </option>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">
                  Newfoundland and Labrador
                </option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Ontario">Ontario</option>
                <option value="Prince Edward Island">
                  Prince Edward Island
                </option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPostal">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={this.state.postal}
                onChange={(e) => this.setState({ postal: e.target.value })}
              />
            </Form.Group>
          </Form.Row>


          {/* <Form.Group controlId="formGridCheckbox">
            <Form.Check type="checkbox" label="Please check this box if you are registering for a clinic" />
          </Form.Group> */}

          <Form.Group controlId="clinicSelection">
            <Form.Label>Registering a clinic?</Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={(e) => this.setState({ isClinic: e.target.value })}
            >
              <option selected value="">
                  Choose..
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>

          <Button
            block
            size="lg"
            type="submit"
            disabled={!this.validateForm()}
            onClick={this.printState}
          >
            SignUp
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
