import React from "react";
import { Button } from "react-bootstrap";
import { logout } from "../actions/users";

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  logout() {
    logout(this.props.app);
    alert('You have successfully logged out'); 
    this.props.history.push('/');
  }
  stay() {
    this.props.history.goBack();
  }
  render() {
    return (
      <div>
        <p>Are you sure that you would like to login?</p>
        <br />
        <Button size="small" onClick={() => this.logout()}>
          Yes
        </Button>
        <Button size="small" onClick={() => this.stay()}>
          No
        </Button>
      </div>
    );
  }
}

export default Logout;
