import React from "react";
import {Row, Col, Image, Button} from "react-bootstrap";

class UserApplication extends React.Component{
    constructor(){
        super();
        console.log('the user app constructor was called');
    }

    rejectApplication = (e) => {
        e.preventDefault();
        alert("Application was rejected");
    }

    acceptApplication = (e) => {
        e.preventDefault();
        alert("Application was accepted");
    }

    render(){
        console.log(this.props);
        return (
            <Row>
                <Col>
                    <Image width="50" height="50" src={this.props.imgSrc} rounded/>
                </Col>
                <Col xs={6}>
                    <div>
                        <p>
                            <strong>Name: </strong> {this.props.userName}
                            <br />
                            <strong>Pet: </strong> {this.props.appliedPet}
                            <br />
                            <strong>Summary: </strong> {this.props.summary}
                        </p>
                    </div>
                </Col>
                <Col>
                    <Button variant="success" onClick={this.rejectApplication}>Accept</Button>
                    <Button variant="danger" onClick={this.acceptApplication}>Reject</Button>
                </Col>
            </Row>
        );
    }
}

export default UserApplication;