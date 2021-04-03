import React from "react";
import "./Applications.css";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import UserApplication from "../userApplication/userApplication";
import { uid } from 'react-uid'

class Applications extends React.Component {
  constructor() {
    super();
    this.state = {
      availPets: [],
      userApps: [],
      searchName: "",
      searchType: "",
      serachBreed: "",
    };
  }

  getAvailPets = () => {
    // get the current pets of the current clinic from the database
    let availPets = [
      { name: "Biscuit", type: "Dog", breed: "Golden Retriever", img: "/dogo.jpeg" },
      { name: "Nosey", type: "Fish", breed: "YYZ", img: "/nosey-fish.jpg" },
      { name: "Pussy Cat", type: "Cat", breed: "Long Haired", img: "/cat1.jpg"},
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
      <div>
        {availPets.length !== 0 ? (
          <div className="appsContainer">
            {availPets.map((pet) => (
              <Card className="appsCard">
                <Card.Header>
                  <strong>{pet.name + " - " + pet.type + " - " + pet.breed}</strong>
                </Card.Header>
                <ul className="list-group list-group-flush">
                  {userApps
                    .filter((app) => app.appliedPet === pet.name)
                    .map((app) => (
                      <li
                        className="list-group-item"
                        key={userApps.indexOf(app)}
                      >
                        <UserApplication
                          admin={false}
                          width={100}
                          height={100}
                          imgSrc={pet.img}
                          userName={app.userName}
                          appliedPet={app.appliedPet}
                          summary="I really like this pet! Please consider my application."
                        />
                      </li>
                    ))}
                </ul>
              </Card>
            ))}
          </div>
        ) : (
          <h3 style={{ color: "white" }}>
            There are no pets left at the moment
          </h3>
        )}
        <div className="appsSearch">
          <Form onSubmit={this.searchApps}>
            <Form.Group as={Row} controlId="searchName">
              <Form.Label column sm={2}>
                <strong>Name:</strong>{" "}
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => {
                    this.setState({ searchName: e.target.value });
                  }}
                >
                <option selected value="">
                  Choose..
                </option>
                {availPets.map(pet => (
                  <option value={pet.name}>{pet.name}</option>
                ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="searchType">
              <Form.Label column sm={2}>
                <strong>Type:</strong>{" "}
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => {
                    this.setState({ searchName: e.target.value });
                  }}
                >
                <option selected value="">
                  Choose..
                </option>
                {availPets.map(pet => pet.type).filter((x, i, a) => a.indexOf(x) === i).map(p => (
                  <option value={p}>{p}</option>
                ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="searchType">
              <Form.Label column sm={2}>
                <strong>Breed:</strong>{" "}
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => {
                    this.setState({ searchName: e.target.value });
                  }}
                >
                <option selected value="">
                  Choose..
                </option>
                {availPets.map(pet => pet.breed).filter((x, i, a) => a.indexOf(x) === i).map(p => (
                  <option value={p}>{p}</option>
                ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Button
              block
              size="lg"
              type="submit"
              style={{ backgroundColor: "#429EA6", borderColor: "transparent" }}
              className="justify-content-md-center"
            >
              Search
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Applications;
