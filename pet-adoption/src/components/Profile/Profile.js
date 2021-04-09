import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReactRoundedImage from "react-rounded-image";

import InfoSection from "./InfoSection/InfoSection";
import PreferenceSection from "./PreferencesSection/PreferencesSection";
import ApplicationSection from "./ApplicationSection/ApplicationSection";
import update from 'immutability-helper';

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
    };
  }

  //check if the user has a profile picture
  async componentDidMount() {
    if (this.state.user && this.state.profilePic == "") {
      this.setState(update(this.state, {"user": {"profilePic": {$set: "/user-profile-placeholder.png"}}}));
      //this.state.user.profilePic = "/user-profile-placeholder.png"; //default pic
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  onProfilePicChange = async (imageList, addUpdateIndex) => {
    if (imageList.length > 0) {
      // adding image
      this.setState(update(this.state, {"user": {"profilePic": {$set: imageList[0]["data_url"]}}}));
      //this.state.user.profilePic = imageList[0]["data_url"];

      try {
        await apiUpdateProfilePicture(this.state.user.profilePic);
      } catch (error) {
        console.log(error);
        alert("Profile picture could not be saved. Please try again!");
      }
    } else {
      //removing image
      this.setState(update(this.state, {"user": {"profilePic": {$set: "/user-profile-placeholder.png"}}}));
    }
    this.forceUpdate();
  };

  onPreferenceAgeChange = (value) => {
    this.setState(update(this.state, {"user": {"preferences": {"age": {$set: value}}}}));
    //this.state.user.preferences.age = value;
    this.forceUpdate();
  };

  onPreferenceDistanceChange = (value) => {
    this.setState(update(this.state, {"user": {"preferences": {"distance": {$set: value}}}}));
    //this.state.user.preferences.distance = value;
    this.forceUpdate();
  };

  onPetSelectChange = (selectedPets) => {
    let petTypes = [];

    selectedPets.forEach((pet) => {
      petTypes.push(pet.value);
    });

    this.setState(update(this.state, {"user": {"preferences": {"petTypes": {$set: petTypes}}}}));
    //this.state.user.preferences.petTypes = petTypes;
    this.forceUpdate();
  };

  onClinicSelectChange = (selectedClinics) => {
    let clinics = [];

    selectedClinics.forEach((clinic) => {
      clinics.push(clinic.value);
    });

    this.setState(update(this.state, {"user": {"preferences": {"clinics": {$set: clinics}}}}));
    //this.state.user.preferences.clinics = clinics;
    this.forceUpdate();
  };

  render() {
    const { app } = this.props;
    const user = app.state.user;
    this.state.user = user;

    console.log("user: " + JSON.stringify(user));

    return (
      <div>
        {user && (
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
                <Tab
                  eventKey="infoSection"
                  title="User Info"
                  tabClassName="sectionTab"
                >
                  <InfoSection
                    user={this.state.user}
                    onProfilePicChange={this.onProfilePicChange}
                  />
                </Tab>

                <Tab
                  eventKey="preferencesSection"
                  title="Preferences"
                  tabClassName="sectionTab"
                >
                  <PreferenceSection
                    user={this.state.user}
                    onPreferenceAgeChange={this.onPreferenceAgeChange}
                    onPreferenceDistanceChange={this.onPreferenceDistanceChange}
                    onPetSelectChange={this.onPreferenceDistanceChange}
                    onClinicSelectChange={this.onClinicSelectChange}
                  />
                </Tab>

                <Tab
                  eventKey="applicationSection"
                  title="Application"
                  tabClassName="sectionTab"
                >
                  <ApplicationSection />
                </Tab>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
