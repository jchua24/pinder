import React from "react";
import { Tabs, Tab} from "react-bootstrap";
import ReactRoundedImage from "react-rounded-image";


import InfoSection from "./InfoSection/InfoSection";
import PreferenceSection from "./PreferencesSection/PreferencesSection";
import ApplicationSection from "./ApplicationSection/ApplicationSection";

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
            preferences: {
                age: [0, 10], 
                distance: [0, 50], 
                petTypes: [],
                clinic: []
            },
            applicationResponses: {}, 
            profilePic: "/user-profile-placeholder.png"
        },
        profilePic: [], 
    } 
  }  

  handleSubmit(event) {
    event.preventDefault();
  }

  onProfilePicChange = (imageList, addUpdateIndex) => {

    if(imageList.length > 0) { // adding image
        this.state.user.profilePic = imageList[0]['data_url']; 
    } else { //removing image
        this.state.user.profilePic = "/user-profile-placeholder.png"; 
    }

    this.forceUpdate();
  };

  onPreferenceAgeChange = (value) => {
    this.state.user.preferences.age = value; 
    this.forceUpdate(); 
  }

  onPreferenceDistanceChange = (value) => {
    this.state.user.preferences.distance = value; 
    this.forceUpdate(); 
  }

  onPetSelectChange = (selectedPets) => {

    let petTypes = []; 

    selectedPets.forEach((pet) => {
        petTypes.push(pet.value); 
    })

    this.state.user.preferences.petTypes = petTypes; 
    this.forceUpdate();
  }

  onClinicSelectChange = (selectedClinics) => {

    let clinics = []; 

    selectedClinics.forEach((clinic) => {
        clinics.push(clinic.value); 
    })

    this.state.user.preferences.clinics = clinics; 
    this.forceUpdate();
  }


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
                    <InfoSection 
                        user={this.state.user}
                        onProfilePicChange={this.onProfilePicChange}
                    /> 
                </Tab> 


                <Tab eventKey="preferencesSection" title="Preferences"> 
                    <PreferenceSection 
                        user={this.state.user} 
                        onPreferenceAgeChange={this.onPreferenceAgeChange}
                        onPreferenceDistanceChange={this.onPreferenceDistanceChange}
                        onPetSelectChange={this.onPreferenceDistanceChange}
                        onClinicSelectChange={this.onClinicSelectChange}
                    /> 
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
