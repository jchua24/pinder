import React from "react";
import { Tabs, Tab} from "react-bootstrap";
import ReactRoundedImage from "react-rounded-image";
import InfoSection from "./InfoSection/InfoSection";
import PreferenceSection from "./PreferencesSection/PreferencesSection";
import ApplicationSection from "./ApplicationSection/ApplicationSection";

import { apiUpdateProfilePicture } from "../../api/user";

import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        //user: {
            // name: "Joshua Chua", 
            // email: "joshuagodwin.chua@mail.utoronto.ca",
            // password: "....",
            // address: "123 Front Street West",
            // city: "Toronto",
            // province: "ON",
            // postal: "L4T 6HJ",
            // isClinic: "",
            // preferences: {
            //     age: [0, 10], 
            //     distance: [0, 50], 
            //     petTypes: [],
            //     clinic: []
            // },
            // applicationResponses: {}, 
            // profilePic: "/user-profile-placeholder.png"
        //},
        profilePic: [], 
    } 
  }  

  handleSubmit(event) {
    event.preventDefault();
  }

  async onProfilePicChange(imageList, addUpdateIndex){

    if(imageList.length > 0) { // adding image
        this.state.user.profilePic = imageList[0]['data_url']; 

    } else { //removing image
        this.state.user.profilePic = "/user-profile-placeholder.png"; 
    }

    try{
      await apiUpdateProfilePicture(this.state.user.profilePic); 
    } catch(error) {
      console.log(error); 
      alert('Profile picture could not be saved. Please try again!');
    }

    this.forceUpdate();
  }

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

    const { app } = this.props;
    const user = app.state.user; 
    this.state.user = user;

    console.log("user: " + JSON.stringify(user)); 

    return (
      <div> 
        {user && 
          <div className="userProfile">

            <div className="profileIntro"> 
                <h1 className="name">{this.state.user.name} </h1> 

                <div className="photo"> 
                  <ReactRoundedImage
                    image={this.state.user.profilePic}
                    roundedColor="#17a2b8"
                    imageWidth="200"
                    imageHeight="200"
                    roundedSize="12"
                    margin="auto"
                  />
                </div> 
                
            </div> 
          
            <div className="profileSections"> 
              <Tabs defaultActiveKey="infoSection"> 
                  <Tab eventKey="infoSection" title="User Info" tabClassName="sectionTab"> 
                      <InfoSection 
                          user={this.state.user}
                          onProfilePicChange={this.onProfilePicChange}
                      /> 
                  </Tab> 


                  <Tab eventKey="preferencesSection" title="Preferences" tabClassName="sectionTab"> 
                      <PreferenceSection 
                          user={this.state.user} 
                          onPreferenceAgeChange={this.onPreferenceAgeChange}
                          onPreferenceDistanceChange={this.onPreferenceDistanceChange}
                          onPetSelectChange={this.onPreferenceDistanceChange}
                          onClinicSelectChange={this.onClinicSelectChange}
                      /> 
                  </Tab> 

                  <Tab eventKey="applicationSection" title="Application" tabClassName="sectionTab"> 
                      <ApplicationSection/>
                  </Tab> 
              </Tabs> 
            </div> 
          </div> 
        }

      </div> 
        

        

    );
  }
}

export default Profile;
