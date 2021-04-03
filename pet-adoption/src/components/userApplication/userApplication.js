import React from "react";
import {Row, Col, Image, Button} from "react-bootstrap";

class UserApplication extends React.Component{
    constructor(props){
        super(props);
        console.log('the user app constructor was called');
    }
    static defaultProps = {
        admin: true,
        width: 50,
        height: 50
    }
    rejectApplication = (e) => {
        e.preventDefault();
        alert("Application was rejected");
    }

    acceptApplication = (e) => {
        e.preventDefault();
        alert("Application was accepted");
    }

    cancelApplication = (e) => {
        e.preventDefault();
        alert("Successfully cancelled application")
        console.log(this.props.width)
    }

    render(){
        console.log(this.props);
        return (
            <Row>
                <Col>
                    <Image width={this.props.width} height={this.props.height} src={this.props.imgSrc} rounded/>
                </Col>
                <Col xs={6}>
                    {this.props.admin ? (
                        <div>
                            <p>
                            <strong>Applicant Name: </strong> {this.props.userName}
                            <br />
                            <strong>Pet: </strong> {this.props.appliedPet}
                            <br />
                            <strong>Summary: </strong> {this.props.summary}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <strong>Pet: </strong> {this.props.appliedPet}
                            <br />
                            <strong>Summary: </strong> {this.props.summary}
                        </div>
                    )}
                    <div>
                        
                    </div>
                </Col>
                <Col>
                    {this.props.admin ? (
                        <div>
                            <Button variant="success" onClick={this.acceptApplication}>Accept</Button>
                            <Button variant="danger" onClick={this.rejectApplication}>Reject</Button>
                        </div>
                    ) : (
                        <Button variant="danger" onClick={this.cancelApplication}>Cancel</Button>
                    )}
                </Col>
            </Row>
        );
    }
}

export default UserApplication;