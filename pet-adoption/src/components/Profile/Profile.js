import React from "react";
import { Carousel} from "react-bootstrap";

import "./Profile.css";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
        user: {
            name: "", 
            email: "",
            password: "",
            address: "",
            city: "",
            province: "",
            postal: "",
            isClinic: "",
            preferences: {},
            applicationResponses: {}
        }
    } 
  }  

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className=" ">
          
      </div>
    );
  }
}

export default Profile;
