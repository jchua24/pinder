import React from "react";
import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

import "./PetPosting.css";
class PetPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      breed: "",
      type: "",
      addInfo: "",
      petImages: []
    };
  }

  validateForm() {
    return (
      this.state.age.length > 0 &&
      this.state.type.length > 0 &&
      this.state.breed.length > 0 &&
      this.state.addInfo.length > 0 &&
      this.state.petImages.length > 0    
    );
  }

  handleSubmit(event){
    event.preventDefault();
    alert('The pet application was submitted!'); 
  }

  render() {
    return (
      <Container className="petPosting">
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="affClinic">
                <Form.Label>Affiliated Clinic</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.props.clinic}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="petType">
                <Form.Label>Pet Type</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => this.setState({ type: e.target.value })}
                >
                  <option value="">Choose..</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="fish">Fish</option>
                  <option value="bird">Bird</option>
                  <option value="reptile">Reptile</option>
                  <option value="smallpet">
                    Small Pet (Mouse, Hamster, Rabit, and etc.)
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="breed">
                <Form.Label>Breed</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Golden Retriever, Husky, etc.."
                  value={this.state.breed}
                  onChange={(e) => this.setState({breed : e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter a valid number.."
                  value={this.state.age}
                  onChange={(e) => this.setState({age: e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="addInfo">
                <Form.Label>Additional Information</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  placeholder="Please enter more information about the pet, let the Hoomans know who they are adopting!"
                  value={this.state.addInfo}
                  onChange={(e) => this.setState({addInfo: e.target.value})}
                />
              </Form.Group>
              <Form.Group>
                <Form.File
                  id="custom-file"
                  label="Attach Pet Images"
                  custom
                />
              </Form.Group>
              <Button
                block
                size="lg"
                type="submit"
                style={{ backgroundColor: "#429EA6", borderColor: "transparent" }}
                disabled={!this.validateForm()}
              >
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={3}>
            <Card style={{ width: "17rem", height: "100%", backgroundColor: '#F6F680' }}>
              <Card.Title style={{paddingTop: '10px'}}>Uploded Images</Card.Title>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PetPosting;
