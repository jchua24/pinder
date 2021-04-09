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
                    <div className="card">
                        <div className="additional">
                            <div className="user-card">
                                <img src={this.props.imgSrc} className="img-center"></img>
                                <div class="multi-button">
                                    <button className="a-r-btn accept-button">Accept</button>
                                    <button className="a-r-btn reject-button">Reject</button>
                                </div>
                            </div>
                            <div className="more-info">
                                <h1>{this.props.userName}</h1>
                                <div className="coords">
                                    <span>Email: {this.props.email}</span>
                                    <br></br>
                                    <span>City: {this.props.city}</span>
                                    <br></br>
                                    <span>Province: {this.props.province}</span>
                                    <br></br>
                                    <span>Phone: {this.props.phoneNumber}</span>
                                </div>
                                <div className="stats">
                                    <button className="a-r-btn ques-btn">Show Questionnaire Results</button>
                                </div>
                            </div>
                        </div>
                        <div className="general">
                            <h1>{this.props.userName}</h1>
                            <p>I am eager to find out more about this little guy! I really connected with him!</p>
                            <span className="more">Mouse over the card for more info</span>
                        </div>
                    </div>
                    ) : (
                    <div className="card">
                        <div className="additional">
                            <div className="user-card">
                                <img src={this.props.petImgSrc} className="img-center"></img>
                                <div class="multi-button">
                                    <button className="a-r-btn reject-button">Cancel Application</button>
                                </div>
                                <div className="stats">
                                    <div>
                                        <div className="title">Status:</div>
                                        <div className="value">{this.props.appStatus}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="more-info">
                                <h1>{this.props.petName}</h1>
                                <div className="coords">
                                    <span>Clinic: {this.props.clinic}</span>
                                    <br></br>
                                    <span>Breed: {this.props.petBreed}</span>
                                    <br></br>
                                    <span>Age: {this.props.petAge}</span>
                                </div>
                                
                            </div>
                        </div>
                        <div className="general">
                            <h1>{this.props.petName}</h1>
                            <p>{this.props.petSummary}</p>
                            <span className="more">Mouse over the card for more info</span>
                        </div>
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