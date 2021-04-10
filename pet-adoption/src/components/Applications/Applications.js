import React from "react";
import "./Applications.css";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { apiGetUserData, apiGetApplications, apiGetPost } from "../../api/user";
import UserApplication from "../userApplication/userApplication";

class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userApps: [],
    };
  }

  getUserApps = async (status = "") => {
    try {
      let data = await apiGetApplications(status);
      console.log(data); 
      this.setState({ userApps: data });
    } catch (err) {
      console.log(err);
    }
  };

  getUser = async (userID) => {
    try {
      return await apiGetUserData(userID);
    } catch (err) {
      console.log(err);
    }
  };

  getPosting = async (postingID, clinicID) => {
    try {
      return await apiGetPost(postingID, clinicID);
    } catch (err) {
      console.log(err);
    }
  };

  getAllInfo() {
    let ret = [],
      selected = this.state.userApps;
    for (let i = 0; i < selected.length; i++)
      ret.push([
        this.getUser(selected[i].userID),
        this.getPosting(selected[i].postingID, selected[i].clinicID),
        selected[i].status,
        selected[i].id
      ]);
    return ret;
  }

  componentDidMount() {
    if (this.state.userApps.length === 0) this.getUserApps();
  }
  render() {
    let { userApps } = this.state;
    return (
      <div className="AdminAppContainer">
        {userApps.length !== 0 ? (
          <div class="center">
            {this.getAllInfo.map(app => (
              <UserApplication
              imgSrc="/user-profile-placeholder.png"
              userName={app[0].name}
              email={app[0].email}
              city={app[0].city}
              phoneNumber={app[0].phone}
              admin={false}
              clinic={app[1].clinicID}
              province={app[0].province}
              petName={app[1].pet.name}
              petImgSrc={app[1].pet.images[0]}
              petSummary={app[1].pet.additionalInfo.substring(0, Math.min(8, app[1].pet.additionalInfo.length))}
              appStatus={app[2]}
              petBreed={app[1].pet.breed}
              petAge={app[1].pet.age}
              id={app[3]}
            />
            ))}
          </div>
        ) : (
          <h3 style={{ color: "white" }}>
            You have not submitted any recent applications.
          </h3>
        )}
      </div>
    );
  }
}

export default Applications;
