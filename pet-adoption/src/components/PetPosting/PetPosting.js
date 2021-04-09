import React from "react";
import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
import bsCustomFileInput from "bs-custom-file-input";
import { apiSubmitPosting } from "../../api/admin";

import "./PetPosting.css";
class PetPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      breed: "",
      type: "",
      additionalInfo: "",
      addClinicDesc: "",
      petImages: [],
      images: [],
    };
    this.onImageChange = this.onImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return (
      this.state.age.length > 0 &&
      this.state.type.length > 0 &&
      this.state.breed.length > 0 &&
      this.state.name.length > 0
    );
  }

  onImageChange(imageList, addUpdateIndex) {
    console.log(imageList, addUpdateIndex);
    this.setState({ petImages: imageList });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let currImages = this.state.petImages, currAge = this.state.age;
    this.setState({ petImages: currImages.map((img) => img["data_url"]), age : parseInt(currAge) });
    console.log(this.state.images); 
    let user = this.props.app.state.currUser;
    let pet = JSON.stringify(this.state),
      clinicID = user.id,
      description = this.state.addClinicDesc;
    try {
      const posting = await apiSubmitPosting(pet, clinicID, description);
      alert("The posting was successfully added!");
    } catch (err) {
      console.log(err);
    }
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
                  placeholder={this.props.app.state.currUser.name}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the pets name.."
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
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
                  onChange={(e) => this.setState({ breed: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter a valid number.."
                  value={this.state.age}
                  onChange={(e) => this.setState({ age: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="additionalInfo">
                <Form.Label>Additional Pet Information</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Please enter more information about the pet, let the Hoomans know who they are adopting!"
                  value={this.state.additionalInfo}
                  onChange={(e) =>
                    this.setState({ additionalInfo: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="addClinicDesc">
                <Form.Label>Additional Clinic Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Please enter any additional clinic related information that you would like the applicants to know"
                  value={this.state.addClinicDesc}
                  onChange={(e) =>
                    this.setState({ addClinicDesc: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                block
                size="lg"
                type="submit"
                style={{
                  backgroundColor: "#429EA6",
                  borderColor: "transparent",
                }}
                disabled={!this.validateForm()}
              >
                Submit
              </Button>
            </Form>
          </Col>
          <Col>
            <p>Please attach the images of the pet here:</p> <br />
            <ImageUploading
              multiple
              value={this.state.petImages}
              onChange={this.onImageChange}
              maxNumber={15}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div
                  className="upload__image-wrapper"
                  style={{ backgroundColor: "" }}
                >
                  <Button
                    className="btn-images1"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </Button>
                  &nbsp;
                  <Button onClick={onImageRemoveAll}>Remove all images</Button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <Button size="sm" onClick={() => onImageUpdate(index)}>
                          &#8635;
                        </Button>
                        <Button size="sm" onClick={() => onImageRemove(index)}>
                          x
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PetPosting;
