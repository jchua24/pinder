import React from "react";
import { apiApproveApplication, apiRejectApplication } from "../../api/admin";
import { apiDeleteApplication } from "../../api/user";

class UserApplication extends React.Component {
  constructor(props) {
    super(props);
    this.openQs = this.openQs.bind(this);
  }
  static defaultProps = {
    admin: true,
    width: 50,
    height: 50,
  };

  // only for admins
  rejectApplication = async () => {
    try {
      await apiRejectApplication(this.props.id);
      alert("The application was successfully rejected");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // only for admins
  acceptApplication = async () => {
    try {
      let data = await apiApproveApplication(this.props.id);
      alert("The application was successfully accepted");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // only for regular users
  cancelApplication = async () => {
    try {
      await apiDeleteApplication(this.props.id);
      window.location.reload();
    
    } catch (err) {
      console.log(err);
    }
  };

  openQs = () => {
    this.props.parent.props.history.push("/userqs/" + this.props.id);
  };

  render() {
    return (
      <div>
        {this.props.admin ? (
          <div
            className="card"
            style={
              this.props.appStatus === "accepted"
                ? { backgroundColor: "green" }
                : {}
            }
          >
            <div className="additional">
              <div className="user-card">
                <img src={this.props.imgSrc} className="img-center"></img>
                <div className="multi-button">
                  <button
                    onClick={() => this.acceptApplication()}
                    className="a-r-btn accept-button"
                    disabled={this.props.appStatus === 'rejected'}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => this.rejectApplication()}
                    className="a-r-btn reject-button"
                    disabled={this.props.appStatus === 'accepted'}
                  >
                    Reject
                  </button>
                </div>
              </div>
              <div className="more-info">
                <h1>{this.props.userName}</h1>
                <div className="coords">
                  <span>Email: {this.props.email}</span>
                  <br></br>
                  <span>City: {this.props.city}</span>
                  <br></br>
                  <span>Province: {this.props.province}</span>
                  <br></br>
                  <span>Phone: {this.props.phoneNumber}</span>
                </div>
                <div className="stats">
                  <button
                    onClick={() => this.openQs()}
                    className="a-r-btn ques-btn"
                  >
                    Show Questionnaire Results
                  </button>
                </div>
              </div>
            </div>
            <div className="general">
              <h1>{this.props.userName}</h1>
              <p>
                I would love to adopt {this.props.petName}!
              </p>
              <span className="more">Mouse over the card for more info</span>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="additional">
              <div className="user-card">
                <img src={this.props.petImgSrc} className="img-center"></img>
                <div className="multi-button">
                  <button className="a-r-btn reject-button" onClick={() => this.cancelApplication()}>
                    Cancel Application
                  </button>
                </div>
                <div className="stats">
                  <div>
                    <div className="title">Status:</div>
                    <div className="value">{this.props.appStatus}</div>
                  </div>
                </div>
              </div>
              <div className="more-info">
                <h1>{this.props.petName}</h1>
                <div className="coords">
                  <span>Clinic: {this.props.clinic}</span>
                  <br></br>
                  <span>Breed: {this.props.petBreed}</span>
                  <br></br>
                  <span>Age: {this.props.petAge}</span>
                </div>
              </div>
            </div>
            <div className="general">
              <h1>{this.props.petName}</h1>
              <p>{this.props.petSummary}</p>
              <span className="more">Mouse over the card for more info</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserApplication;
