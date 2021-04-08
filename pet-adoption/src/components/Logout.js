import React from "react";
import { Button } from "react-bootstrap";
import { apiLogout } from "../api/auth";

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = async () =>  {
    try{
      await apiLogout();
    } catch(error) {
      console.log(error); 
      alert('The email or password that you have entered is incorrect!');
    }    

    this.props.app.setState({
      currUser: null,
      message: { type: "", body: "" },
    });

    alert('You have successfully logged out'); 
    this.props.history.push('/');
  }

  stay() {
    this.props.history.goBack();
  }
  render() {
    return (
      <div>
        <p>Are you sure that you would like to logout?</p>
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
