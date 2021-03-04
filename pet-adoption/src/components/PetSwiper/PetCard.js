import React from "react";
import {Card, Button} from "react-bootstrap";
import ReactCardFlip from 'react-card-flip'; 
import SimpleReactLightBox from 'simple-react-lightbox'; 
import {SRLWrapper} from "simple-react-lightbox"; 

class PetCard extends React.Component {
  constructor(props) {
      super();
      this.state = {
          showDetails: false //flag to determine which side of the card to show 
      }
  }

  render() {

    const petData = this.props.petData; 

    console.log("pet images: " + JSON.stringify(petData.images));

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
            <Card bg="light" style={{width: '50rem'}} onClick={() => this.setState({showDetails: !this.state.showDetails})}>
                <Card.Img variant="top" src={petData.coverImage}/>
                <Card.Body>
                    <Card.Title>{petData.name}</Card.Title>
                    <Card.Subtitle>Type: {petData.type}, Breed: {petData.breed}</Card.Subtitle>
                    <Card.Text>{petData.addInfo}</Card.Text>
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
            <Card bg="light" style={{width: '50rem'}} onClick={() => this.setState({showDetails: !this.state.showDetails})}>
                <Card.Img variant="top" src={petData.coverImage}/>

                <Card.ImgOverlay>
                    <Card.Title>{petData.name}</Card.Title>
                    <Card.Subtitle>Type: {petData.type}, Breed: {petData.breed}</Card.Subtitle>
                    <Card.Text>This is the back of the card.</Card.Text>

                </Card.ImgOverlay> 

                <Card.Body>
                    <Card.Title>{petData.name}</Card.Title>
                    <Button variant="primary">Apply</Button>
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
