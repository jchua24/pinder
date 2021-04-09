import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { apiApproveApplication, apiRejectApplication } from "../../api/admin";
import { apiDeleteApplication } from "../../api/user";

class UserApplication extends React.Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    admin: true,
    width: 50,
    height: 50,
  };

  // only for admins
  rejectApplication = async () => {
    try {
      await apiRejectApplication(this.props.id);
    } catch (err) {
      console.log(err);
    }
  };

  // only for admins
  acceptApplication = async () => {
    try {
      let data = await apiApproveApplication(this.props.id);
    } catch (err) {
      console.log(err);
    }
  };

  // only for regular users
  cancelApplication = async () => {
    try {
      await apiDeleteApplication(this.props.id);
    } catch (err) {
      console.log(err);
    }
  };

    render(){
        return (
            <div>
                {this.props.admin ? (
                    <div className="card">
                        <div className="additional">
                            <div className="user-card">
                                <img src={this.props.imgSrc} className="img-center"></img>
                                <div class="multi-button">
                                <button
                                    onClick={() => this.acceptApplication()}
                                    className="a-r-btn accept-button"
                                >
                                Accept
                                </button>
                                <button
                                onClick={() => this.rejectApplication()}
                                className="a-r-btn reject-button"
                                >
                                Reject
                                </button>
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
    //         <div className="general">
    //           <h1>{this.props.userName}</h1>
    //           <p>{this.props.summary}</p>
    //           <span className="more">Mouse over the card for more info</span>
    //         </div>
    //       </div>
    //         ) : (
    //       <div className={`card ${this.props.color}`}>
    //         <div className="additional">
    //           <div className="user-card">
    //             <img src={this.props.petImgSrc} className="img-center"></img>
    //             <div class="multi-button">
    //               <button className="a-r-btn reject-button">
    //                 Cancel Application
    //               </button>
    //             </div>
    //             <div className="stats">
    //               <div>
    //                 <div className="title">Status:</div>
    //                 <div className="value">{this.props.appStatus}</div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="more-info">
    //             <h1>{this.props.petName}</h1>
    //             <div className="coords">
    //               <span>CLinic: {this.props.clinic}</span>
    //               <br></br>
    //               <span>Breed: {this.props.petBreed}</span>
    //               <br></br>
    //               <span>Age: {this.props.petAge}</span>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="general">
    //           <h1>{this.props.petName}</h1>
    //           <p>{this.props.petSummary}</p>
    //           <span className="more">Mouse over the card for more info</span>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    );
  }
}

export default UserApplication;
