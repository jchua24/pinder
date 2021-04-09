import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReactRoundedImage from "react-rounded-image";

import InfoSection from "./InfoSection/InfoSection";
import PreferenceSection from "./PreferencesSection/PreferencesSection";
import ApplicationSection from "./ApplicationSection/ApplicationSection";
import update from 'immutability-helper';

import { apiUpdateProfilePicture, apiUpdatePreferences } from "../../api/user";

import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      profilePic: [],
    };
  }
 
  //set user data
  async componentDidMount() {
 
    const { app } = this.props; 
    this.setState({user: app.state.currUser});
    console.log("user:" + JSON.stringify(app.state.currUser));
    this.forceUpdate();  

    //check if the user has a profile picture
    if (this.state.user && this.state.user.profilePic == "") {
      this.setState(update(this.state, {"user": {"profilePic": {$set: "/user-profile-placeholder.png"}}}));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  onUpdatePreferences = async () => {
    try {
      await apiUpdatePreferences(this.state.user.preferences);
      this.props.app.setState({ currUser: this.state.user}); //update app user 
      alert("Preferences saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Preferences could not be saved. Please try again!");
    }
  }

  onProfilePicChange = async (imageList, addUpdateIndex) => {
    if (imageList.length > 0) {
      // adding image
      this.setState(update(this.state, {"user": {"profilePic": {$set: imageList[0]["data_url"]}}}));

      try {
        await apiUpdateProfilePicture(this.state.user.profilePic);
        this.props.app.setState({ currUser: this.state.user}); //update app user
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

    console.log("profile user: " + JSON.stringify(this.state.user));

    this.setState(update(this.state, {"user": {"preferences": {"age": {$set: value}}}}));
    this.forceUpdate();
  };

  onPreferenceDistanceChange = (value) => {
    this.setState(update(this.state, {"user": {"preferences": {"radius": {$set: value}}}}));
    this.forceUpdate();
  };

  onPetSelectChange = (selectedPets) => {
    let petTypes = [];

    selectedPets.forEach((pet) => {
      petTypes.push(pet.value);
    });

    console.log("selected pets: " + petTypes); 
    console.log("original list: " + selectedPets); 

    this.setState(update(this.state, {"user": {"preferences": {"petTypes": {$set: petTypes}}}}));
    this.forceUpdate(); 
  };

  render() {

    return (
      <div>
        {this.state.user != {} && !this.state.user.admin && (
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
                    onPetSelectChange={this.onPetSelectChange}
                    onUpdatePreferences={this.onUpdatePreferences}
                  />
                </Tab>

                <Tab
                  eventKey="applicationSection"
                  title="Application"
                  tabClassName="sectionTab"
                >
                  <ApplicationSection {...this.props}/>
                </Tab>
              </Tabs>
            </div>
          </div>
        )}



        {this.state.user != {} && this.state.user.admin && (
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
              </Tabs>
            </div>
          </div>
        )}  
      </div>
    );
  }
}

export default Profile;
