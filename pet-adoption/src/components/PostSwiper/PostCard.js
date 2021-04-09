import React from "react";
import {Card, Button} from "react-bootstrap";
import ReactCardFlip from 'react-card-flip'; 
import SimpleReactLightBox from 'simple-react-lightbox'; 
import {SRLWrapper} from "simple-react-lightbox"; 
import {ArrowCounterclockwise } from 'react-bootstrap-icons';

import "./PostCard.css"

class PostCard extends React.Component {
  constructor(props) {
      super();
      this.state = {
          showDetails: false, //flag to determine which side of the card to show 
      }
  }

  flipCard = () => {
    this.setState({showDetails: !this.state.showDetails})
  }

  render() {

    const postData = this.props.postData;

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
                <Card.Img src={postData.pet.images[0].src}/>
                <Card.Body>
                    <Card.Title>{postData.pet.name} <ArrowCounterclockwise color="grey" size={25} onClick={this.flipCard}/> </Card.Title>
                    <Card.Subtitle>Type: {postData.pet.type} | Breed: {postData.pet.breed}</Card.Subtitle>
                    <Card.Text>{postData.pet.description}</Card.Text>
                </Card.Body>

                <Card.Footer> 
                    <SimpleReactLightBox> 
                        <SRLWrapper options={lightBoxOptions}> 
                            {postData.pet.images.map((petImg) => (
                                <a href={petImg}>
                                    <img src={petImg} style={{height: '100px'}}/>
                                </a>
                            ))}
                        </SRLWrapper>
                    </SimpleReactLightBox>
                </Card.Footer>
            </Card>

            {/* Back Side */}
            <Card bg="light">
                <Card.Img src={postData.pet.images[0].src} className="opaque"/>

                <Card.ImgOverlay>
                    <Card.Title>{postData.pet.name}</Card.Title>
                    <Card.Text>Type: {postData.pet.type} | Breed: {postData.pet.breed}</Card.Text>
                    <Card.Text>Age: {postData.pet.age}</Card.Text>
                    <Card.Text>Clinic Name: {postData.clinicName}</Card.Text>
                    <Card.Text>Clinic Address: {postData.clinicAddress}</Card.Text>
                    <Card.Text>Additional Info: {postData.pet.additionalInfo}</Card.Text>
                </Card.ImgOverlay> 

                <Card.Body className="elevate">
                    <Card.Title>{postData.pet.name} <ArrowCounterclockwise color="grey" size={25} onClick={this.flipCard} /></Card.Title>
                    <Button variant="primary" onClick={() => this.props.submitApplication(postData)}>Apply</Button>
                </Card.Body>

                <Card.Footer className="elevate"> 
                    <SimpleReactLightBox> 
                        <SRLWrapper options={lightBoxOptions}> 
                            {postData.pet.images.map((petImg) => (
                                <a href={petImg}>
                                    <img src={petImg} style={{height: '100px'}}/>
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

PostCard.defaultProps = {
    'Bread' : 'Unknown',
    'Age' : 'Uknown',
    'addInfo' : 'No additional information available at the moment'
}

export default PostCard;
