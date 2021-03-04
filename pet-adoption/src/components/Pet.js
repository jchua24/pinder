import React from "react";

import {Card} from "react-bootstrap";
class Pet extends React.Component {
  constructor(props) {
      super();
  }
  render() {
    return (
        <Card bg="info" style={{width: '17rem', height: '24rem'}}>
            <Card.Img variant="top" src={this.props.imgSrc} style={{height: '65%'}}/>
            <Card.Body >
                <Card.Title>{this.props.name}</Card.Title>
                <Card.Subtitle><strong>Type</strong>: {this.props.type}, <strong>Breed:</strong> {this.props.breed}</Card.Subtitle>
                <Card.Text>{this.props.addInfo}</Card.Text>
                {this.props.comments !== '' ? <Card.Text>Comments: {this.props.comments}</Card.Text> : ""}
            </Card.Body>
        </Card>
    );
  }
}

Pet.defaultProps = {
    'Bread' : 'Unknown',
    'Age' : 'Uknown',
    'addInfo' : 'No additional information available at the moment',
    'comments' : ''
}

export default Pet;
