import React from "react";

import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import UserApplication from "../userApplication/userApplication";
class AdminApplications extends React.Component {
  constructor() {
    super();
    this.state = {
      availPets: [],
      userApps: [],
    };
  }

  getAvailPets = () => {
    // get the current pets of the current clinic from the database
    let availPets = [
        {name: 'jack'},
        {name: 'dack'},
        {name: 'mack'}
    ];
    this.setState({availPets: availPets}, () => console.log('available pets were acquired'));
    this.getUserApps();
  };

  getUserApps = () => {
    // get user applications that were sent to this clinic from the database
    let userApps = [
      {userName: 'Parsa', appliedPet: 'jack'},
      {userName: 'Bam', appliedPet: 'dack'},
      {userName: 'Parsa', appliedPet: 'mack'}
    ];
    this.setState({userApps: userApps}, () => console.log('user applications were acquired'));
  };

  componentDidMount(){
    if (this.state.availPets.length === 0)
      this.getAvailPets();
  }

  render() {
    let { availPets, userApps } = this.state;
    return (
      <div>
        {availPets.length !== 0
          ? <div>
            <Accordion defaultActiveKey="0" key="0">          
            {availPets.map((pet) => (
                <Card key={availPets.indexOf(pet)}>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="info" eventKey={availPets.indexOf(pet)}>
                      {pet.name}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse event={availPets.indexOf(pet)}>
                    {/* <ul className="list-group list-group-flush">
                      {userApps.filter(app => app.appliedPet === pet.name).map(app => (
                        // <li className="list-group-item" key={userApps.indexOf(app)}>
                        //     <UserApplication 
                        //       imgSrc="/user-profile-placeholder.png"
                        //       userName={app.userName} 
                        //       appliedPet={app.appliedPet} 
                        //       summary="cool shit" 
                        //     />
                        // </li>
                        <h1 key={userApps.indexOf(app)}>hi</h1>
                      ))}
                    </ul> */}
                    <Card.Body>hi</Card.Body>
                  </Accordion.Collapse>
                </Card>
            ))}
            </Accordion>
            </div>
          : <h3 style={{color: "white"}}>There are no available pets at the moment</h3>}
      </div>
    );
  }
}

export default AdminApplications;
