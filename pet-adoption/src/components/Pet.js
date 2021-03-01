import React from "react";

import {Card} from "react-bootstrap";
class Pet extends React.Component {
  constructor(props) {
      super();
  }
  render() {
    return (
        <Card bg="light" style={{width: '17rem'}}>
            <Card.Img variant="top" src={this.props.imgSrc}/>
            <Card.Body>
                <Card.Title>{this.props.name}</Card.Title>
                <Card.Subtitle>Type: {this.props.type}, Breed: {this.props.breed}</Card.Subtitle>
                <Card.Text>{this.props.addInfo}</Card.Text>
            </Card.Body>
        </Card>
    );
  }
}

Pet.defaultProps = {
    'Bread' : 'Unknown',
    'Age' : 'Uknown',
    'addInfo' : 'No additional information available at the moment'
}

export default Pet;
