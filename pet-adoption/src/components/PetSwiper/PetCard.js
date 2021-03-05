import React from "react";
import {Form, Card, Button} from "react-bootstrap";
import ReactCardFlip from 'react-card-flip'; 
import SimpleReactLightBox from 'simple-react-lightbox'; 
import {SRLWrapper} from "simple-react-lightbox"; 
import { InfoCircleFill, ArrowCounterclockwise } from 'react-bootstrap-icons';
import Popup from 'reactjs-popup';

import "./PetCard.css"

class PetCard extends React.Component {
  constructor(props) {
      super();
      this.state = {
          showDetails: false, //flag to determine which side of the card to show 
          message: ""
      }
  }

  flipCard = () => {
    this.setState({showDetails: !this.state.showDetails})
  }

  submitApplication = () => {
      alert("submit application!");
  }

  render() {

    const petData = this.props.petData;

    const lightBoxOptions = {
        settings: {
            autoPlaySpeed: 3000
        },
        caption: {}, 
        buttons: {}, 
        thumbnails: {
            showThumbnails: true, 
            thumbnailsSize: ["100px", "100px"]
        },
        progressBar: {}
    }

    return (

        <ReactCardFlip isFlipped={this.state.showDetails} flipDirection="vertical">

            {/* Front Side */}
            <Card bg="light">
                <Card.Img src={petData.coverImage}/>
                <Card.Body>
                    <Card.Title>{petData.name} <ArrowCounterclockwise color="grey" size={25} onClick={this.flipCard}/> </Card.Title>
                    <Card.Subtitle>Type: {petData.type} | Breed: {petData.breed}</Card.Subtitle>
                    <Card.Text>{petData.tagline}</Card.Text>
                </Card.Body>

                <Card.Footer> 
                    <SimpleReactLightBox> 
                        <SRLWrapper options={lightBoxOptions}> 
                            {petData.images.map((petImg) => (
                                <a href={petImg.src}>
                                    <img src={petImg.src} alt={petImg.caption} style={{height: '100px'}}/>
                                </a>
                            ))}
                        </SRLWrapper>
                    </SimpleReactLightBox>
                </Card.Footer>
            </Card>

            {/* Back Side */}
            <Card bg="light">
                <Card.Img src={petData.coverImage} className="opaque"/>

                <Card.ImgOverlay>
                    <Card.Title>{petData.name}</Card.Title>
                    <Card.Text>Type: {petData.type} | Breed: {petData.breed}</Card.Text>
                    <Card.Text>Age: {petData.age}</Card.Text>
                    <Card.Text>Clinic Name: {petData.clinicName}</Card.Text>
                    <Card.Text>Clinic Address: {petData.clinicAddress}</Card.Text>
                    <Card.Text>Additional Info: {petData.addInfo}</Card.Text>
                </Card.ImgOverlay> 

                <Card.Body className="elevate">
                    <Card.Title>{petData.name} <ArrowCounterclockwise color="grey" size={25} onClick={this.flipCard} /></Card.Title>
                    {/*<Button variant="primary" onClick={this.submitApplication}>Apply</Button>*/}
                    <Popup trigger={<Button variant="primary">Apply</Button>} position="center">
                    <div className = "SubmitApp">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group size="lg" controlId="formComments">
                                <Form.Label className="SubmitAppDetail">Tell this pet seller a message!</Form.Label>
                                <Form.Control
                                    autoFocus
                                    as="textarea"
                                    type="text"
                                    value={this.state.message}
                                    onChange={(e) => this.setState({ message: e.target.value })}
                                    rows={4}
                                />
                            </Form.Group>
                            <Button block type="submit" onClick={this.submitApplication}>
                                Submit
                            </Button>
                        </Form>
                    </div> 
                    </Popup>
                </Card.Body>

                <Card.Footer className="elevate"> 
                    <SimpleReactLightBox> 
                        <SRLWrapper options={lightBoxOptions}> 
                            {petData.images.map((petImg) => (
                                <a href={petImg.src}>
                                    <img src={petImg.src} alt={petImg.caption} style={{height: '100px'}}/>
                                </a>
                            ))}
                        </SRLWrapper>
                    </SimpleReactLightBox>
                </Card.Footer>

            </Card>
        </ReactCardFlip>

    );
  }
}

PetCard.defaultProps = {
    'Bread' : 'Unknown',
    'Age' : 'Uknown',
    'addInfo' : 'No additional information available at the moment'
}

export default PetCard;
