import React from "react";

import { Form, Button, Card, Row, Col } from "react-bootstrap";
import UserApplication from "../userApplication/userApplication";
import RcSlider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

import "./AdminApplications.css";
import {
  apiGetApplications,
  apiGetPosting,
  apiGetPostings,
} from "../../api/admin";
import { apiGetUserData } from "../../api/user";

const RcRange = RcSlider.createSliderWithTooltip(RcSlider.Range);
const ToolTipSlider = createSliderWithTooltip(RcSlider);

class AdminApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availPets: [],
      userApps: [],
      selctedApps: [],
      searchAge: "",
      searchType: "",
      searchBreed: "",
      searchName: "",
    };
    this.getAllInfo = this.getAllInfo.bind(this);
  }

  getAvailPets = async (status = "") => {
    // get the current pets of the current clinic from the database
    try {
      let availPets = await apiGetPostings();
      this.setState({ availPets: availPets }, () =>
        console.log("available pets were acquired")
      );
      this.getUserApps();
    } catch (err) {
      console.log(err);
    }
  };

  getUserApps = async () => {
    // get user applications that were sent to this clinic from the database
    try {
      let userApps = await apiGetApplications();
      this.setState({ userApps: userApps }, () =>
        console.log("user applications were acquired")
      );
      this.setState({ selctedApps: userApps });
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

  getPosting = async (postingID) => {
    try {
      return await apiGetPosting(postingID);
    } catch (err) {
      console.log(err);
    }
  };

  searchApps = (e) => {
    e.preventDefault();
    let currApps = this.state.userApps,
      age = this.state.searchAge,
      breed = this.state.searchBreed,
      type = this.state.searchType,
      name = this.state.searchName;
    if (age)
      currApps = currApps.filter(
        (app) => this.getPosting(app.userID).pet.age === parseInt(age)
      );
    if (breed)
      currApps = currApps.filter(
        (app) => this.getPosting(app.userID).pet.breed === breed
      );
    if (type)
      currApps = currApps.filter(
        (app) => this.getPosting(app.userID).pet.type === type
      );
    if (name)
      currApps = currApps.filter(
        (app) => this.getPosting(app.userID).pet.breed === name
      );
    this.setState({ selectedApps: currApps });
  };

  getAllInfo() {
    let ret = [],
      selected = this.state.selectedApps;
    for (let i = 0; i < selected.length; i++)
      ret.push([
        this.getUser(selected[i].userID),
        this.getPosting(selected[i].postingID),
        selected[i].status,
      ]);
    return ret;
  }

  componentDidMount() {
    if (this.state.availPets.length === 0) this.getAvailPets();
  }

  render() {
    let { availPets, userApps } = this.state;

    return (
      <div className="AdminAppContainer">
        <div className="appsSearch">
          <Form onSubmit={this.searchApps}>
            <Form.Group as={Row} controlId="searchType">
              <Form.Label column sm={2}>
                <strong>Type:</strong>{" "}
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  custom
                  defaultValue=""
                  onChange={(e) => {
                    this.setState({ searchType: e.target.value });
                  }}
                >
                  <option value="">Choose..</option>
                  {availPets
                    .map((pet) => pet.pet.type)
                    .filter((x, i, a) => a.indexOf(x) === i)
                    .map((p) => (
                      <option value={p}>{p}</option>
                    ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="searchBreed">
              <Form.Label column sm={2}>
                <strong>Breed:</strong>{" "}
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  custom
                  defaultValue=""
                  onChange={(e) => {
                    this.setState({ searchBreed: e.target.value });
                  }}
                >
                  <option value="">Choose..</option>
                  {availPets
                    .map((pet) => pet.pet.breed)
                    .filter((x, i, a) => a.indexOf(x) === i)
                    .map((p) => (
                      <option value={p}>{p}</option>
                    ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="searchAge">
              <Form.Label column sm={2}>
                <strong>Age Range:</strong>{" "}
              </Form.Label>
              <Col>
                <RcRange
                  tipFormatter={(value) => `${value}`}
                  tipProps={{ visible: true }}
                  defaultValue={[0, 10]}
                  min={0}
                  max={50}
                  className="slider"
                  handleStyle={{
                    borderColor: "#17a2b8",
                    backgroundColor: "white",
                  }}
                  trackStyle={[{ backgroundColor: "#17a2b8" }]}
                />
                <Form.Control
                  as="select"
                  custom
                  defaultValue=""
                  onChange={(e) => {
                    this.setState({ searchName: e.target.value });
                  }}
                >
                  <option value="">Choose..</option>
                  {availPets.map((pet) => (
                    <option value={pet.pet.name}>{pet.pet.name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Button
              inline-block
              size="lg"
              type="submit"
              style={{ backgroundColor: "#429EA6", borderColor: "transparent" }}
              className="searchButton" /*"justify-content-md-center"*/
            >
              Search
            </Button>
          </Form>
        </div>
        {userApps.length !== 0 ? (
          <div class="center">
            {this.getAllInfo().map((app) => (
              <UserApplication
                imgSrc="/user-profile-placeholder.png"
                userName={app[0].name}
                email={app[0].email}
                city={app[0].city}
                phoneNumber={app[0].phone}
                admin={true}
                province={app[0].province}
                petName={app[1].pet.name}
                petImgSrc={app[1].pet.images[0]}
                petSummary={app[1].pet.additionalInfo.substring(0, Math.min(8, app[1].pet.additionalInfo.length))}
                appStatus={app[2]}
                petBreed={app[1].pet.breed}
                petAge={app[1].pet.age}
              />
            ))}
          </div>
        ) : (
          <h3 style={{ color: "white" }}>
            There are no pets left at the moment
          </h3>
        )}
      </div>
    );
  }
}

export default AdminApplications;
