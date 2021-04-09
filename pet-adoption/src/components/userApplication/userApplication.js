import React from "react";
import {Row, Col, Image, Button} from "react-bootstrap";

class UserApplication extends React.Component{
    constructor(props){
        super(props);
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
    }

    render(){
        return (
            <div>
                {this.props.admin ? (
                    <div className={`card ${this.props.color}`}>
                        <div className="additional">
                            <div className="user-card">
                                <img src={this.props.imgSrc} className="img-center"></img>
                            </div>
                            <div className="more-info">
                                <h1>{this.props.userName}</h1>
                                <div className="coords">
                                    <span>{this.props.email}</span>
                                    <br></br>
                                    <span>{this.props.province}</span>
                                    <br></br>
                                    <span>{this.props.city}</span>
                                    <br></br>
                                    <span>{this.props.phoneNumber}</span>
                                </div>
                                <div className="stats">
                                    <div>
                                        <div className="title">Enviroment</div>
                                        <div className="value">{this.props.env}</div>
                                    </div>
                                    <div>
                                        <div className="title">Owned Pet</div>
                                        <div className="value">{this.props.owned}</div>
                                    </div>
                                    <div>
                                        <div className="title">Household</div>
                                        <div className="value">{this.props.houseHold}</div>
                                    </div>
                                    <div>
                                        <div className="title">Pet Diet</div>
                                        <div className="value">{this.props.petDiet}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="general">
                            <h1>{this.props.userName}</h1>
                            <p>{this.props.summary}</p>
                            <span className="more">Mouse over the card for more info</span>
                        </div>
                    </div>
                    ) : (
                        <div>
                            <h1>hellow</h1>
                        </div>
                    )}
               
            </div>
        );
    }
}

export default UserApplication;





{/* 
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
            */}