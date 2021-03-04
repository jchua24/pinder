import React from "react";

import {Card} from "react-bootstrap";
class Pet extends React.Component {
  constructor(props) {
      super();
  }
  render() {
    return (
        <Card bg="info" style={{width: '17rem', height: this.props.cardHeight}}>
            <Card.Img variant="top" src={this.props.imgSrc} style={{height: this.props.imgHeight}}/>
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
    'comments' : '',
    'cardHeight' : '24rem',
    'imgHeight' : '65%'
}

export default Pet;
