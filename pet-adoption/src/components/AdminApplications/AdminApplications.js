import React from "react";

import { Form, Button, Card, Row, Col } from "react-bootstrap";
import UserApplication from "../userApplication/userApplication";
import RcSlider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';

import "./AdminApplications.css";

const RcRange = RcSlider.createSliderWithTooltip(RcSlider.Range);
const ToolTipSlider = createSliderWithTooltip(RcSlider);

class AdminApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availPets: [],
      userApps: [],
      searchAge: "",
      searchType: "",
      searchBreed: "",
    };
  }

  getAvailPets = () => {
    // get the current pets of the current clinic from the database
    let availPets = [
      { name: "Biscuit", type: "Dog", breed: "Golden Retriever", id: 1 },
      { name: "Nosey", type: "Fish", breed: "YYZ", id: 2 },
      { name: "Pussy Cat", type: "Cat", breed: "Long Haired", id: 3 },
    ];
    this.setState({ availPets: availPets }, () =>
      console.log("available pets were acquired")
    );
    this.getUserApps();
  };

  getUserApps = () => {
    // get user applications that were sent to this clinic from the database
    let userApps = [
      { userName: "Parsa", appliedPet: "Biscuit" },
      { userName: "Bam", appliedPet: "Nosey" },
      { userName: "Parsa", appliedPet: "Pussy Cat" },
    ];
    this.setState({ userApps: userApps }, () =>
      console.log("user applications were acquired")
    );
  };

  searchApps = (e) => {
    e.preventDefault();
    alert('The search functionality is not fully implemented at the moment.');
  };

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
                <option value="">
                  Choose..
                </option>
                {availPets.map(pet => pet.type).filter((x, i, a) => a.indexOf(x) === i).map(p => (
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
                <option value="">
                  Choose..
                </option>
                {availPets.map(pet => pet.breed).filter((x, i, a) => a.indexOf(x) === i).map(p => (
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
                handleStyle={{borderColor: '#17a2b8', backgroundColor: 'white'}}
                trackStyle={[{backgroundColor: "#17a2b8"}]}
              />
                {/* <Form.Control
                  as="select"
                  custom
                  defaultValue=""
                  onChange={(e) => {
                    this.setState({ searchName: e.target.value });
                  }}
                >
                <option value="">
                  Choose..
                </option>
                {availPets.map(pet => (
                  <option value={pet.name}>{pet.name}</option>
                ))}
                </Form.Control> */}
              </Col>
            </Form.Group>
            <Button
              inline-block
              size="lg"
              type="submit"
              style={{ backgroundColor: "#429EA6", borderColor: "transparent"}}
              className="searchButton"/*"justify-content-md-center"*/
            >
              Search
            </Button>
          </Form>
        </div>
        {availPets.length !== 0 ? (
        <div class="center">
          <UserApplication
            imgSrc="/user-profile-placeholder.png"
            userName="Jack"
            email="testing@123.com"
            city="toronto"
            phoneNumber="1113334455"
            env="condo"
            owned="no"
            houseHold="4"
            petDiet="dry"
            summary="I really like this pet! Please consider my application."
            admin={false}
            province="Ontario"
            color=""
            petName="catty"
            petImgSrc="/cat1.jpg"
            petSummary="Im very cute pleaaase take me!"
            appStatus="Pending"
            clinic="Animal Hospital"
            petBreed="pussycatlol"
            petAge="8"

            />
        </div>
          // <div className="appsContainer2">
          //   {availPets.map((pet) => (
          //     <Card key={pet.id} className="appsCard">
          //       <Card.Header>
          //         <strong>{pet.name + " - " + pet.type + " - " + pet.breed}</strong>
          //       </Card.Header>
          //       <ul className="list-group list-group-flush">
          //         {userApps
          //           .filter((app) => app.appliedPet === pet.name)
          //           .map((app) => (
          //             <li
          //               className="list-group-item"
          //               key={userApps.indexOf(app)}
          //             >
          //               <UserApplication
          //                 imgSrc="/user-profile-placeholder.png"
          //                 userName={app.userName}
          //                 appliedPet={app.appliedPet}
          //                 summary="I really like this pet! Please consider my application."
          //               />
          //             </li>
          //           ))}
          //       </ul>
          //     </Card>
          //   ))}
          // </div>
          
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
