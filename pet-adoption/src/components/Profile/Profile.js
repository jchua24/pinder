import React from "react";
import { Tabs, Tab} from "react-bootstrap";
import ImageUploading from 'react-images-uploading';
import ReactRoundedImage from "react-rounded-image";

import "./Profile.css";


class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
        user: {
            name: "Joshua Chua", 
            email: "joshuagodwin.chua@mail.utoronto.ca",
            password: "....",
            address: "123 Front Street West",
            city: "Toronto",
            province: "ON",
            postal: "L4T 6HJ",
            isClinic: "",
            preferences: {},
            applicationResponses: {}, 
            profilePic: "/user-profile-placeholder.png"
        },
        profilePic: [], 
    } 
  }  

  handleSubmit(event) {
    event.preventDefault();
  }

  onChange = (imageList, addUpdateIndex) => {

    if(imageList.length > 0) { // adding image
        this.state.user.profilePic = imageList[0]['data_url']; 
    } else { //removing image
        this.state.user.profilePic = "/user-profile-placeholder.png"; 
    }

    this.forceUpdate();
  };


  render() {


    return (
        <div className="userProfile">
            <h1>{this.state.user.name} </h1> 

            <ReactRoundedImage
                image={this.state.user.profilePic}
                roundedColor="#17a2b8"
                imageWidth="150"
                imageHeight="150"
                roundedSize="13"
            />

            <Tabs defaultActiveKey="infoSection"> 
                <Tab eventKey="infoSection" title="User Info"> 
                    <div className="infoSection">
                        <h3>User Info</h3>
                        
                        <h6>Email: {this.state.user.email} </h6> 
                        <h6>Address: {this.state.user.address}</h6>
                        <h6>City: {this.state.user.city}</h6>
                        <h6>Province: {this.state.user.province}</h6>

                        <ImageUploading
                            value={this.state.profilePic}
                            onChange={this.onChange}
                            maxNumber={1}
                            dataURLKey="data_url"
                        >
                            {({
                            onImageUpload,
                            onImageRemoveAll,
                            isDragging,
                            dragProps,
                            }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    >
                                    Add/Change Profile Pic 
                                </button>
                            
                                <button onClick={onImageRemoveAll}>Remove Profile Pic</button>
                            </div>
                            )}
                        </ImageUploading>
                    </div> 
                </Tab> 

                <Tab eventKey="preferencesSection" title="Preferences"> 
                    <div className="preferencesSection">
                        <h3>User Preferences</h3>
                    </div> 
                </Tab> 

                <Tab eventKey="applicationSection" title="Application"> 
                    <div className="applicationSection">  
                        <h3>Application Section</h3>
                    </div> 
                </Tab> 
            </Tabs> 
        
        </div> 

    );
  }
}

export default Profile;
