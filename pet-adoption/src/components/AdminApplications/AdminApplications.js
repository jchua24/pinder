import React from "react";

import { Col, Row } from "react-bootstrap";

class AdminApplication extends React.Component {
  constructor() {
    super();
    this.state = {
      availPets: [],
      userApps: [],
    };
  }

  getAvailPets = () => {
    // get the current pets of the current clinic from the database
  };

  getUserApps = () => {
    // get user applications that were sent to this clinic from the database
  };

  render() {
    let { availPets, userApps } = this.state;
    return (
      <div>
        {availPets
          ? availPets.map((pet) => (
              <Row>
                <Col>
                  <h1>{pet.name}</h1>
                </Col>
              </Row>
            ))
          : this.getAvailPets()}
      </div>
    );
  }
}

export default AdminApplication;
