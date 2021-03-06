import React from "react";
import { Tabs, Tab, Dropdown} from "react-bootstrap";
import ImageUploading from 'react-images-uploading';
import ReactRoundedImage from "react-rounded-image";

import "./PreferencesSection.css";
import Select from 'react-select';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
const RcRange = RcSlider.createSliderWithTooltip(RcSlider.Range);



class PreferencesSection extends React.Component {
  constructor() {
    super();
  }  

  render() {

    const petOptions = [
        {
            value: 'dog', 
            label: 'Dog'
        }, 
        {
            value: 'cat', 
            label: 'Cat'
        }, 
        {
            value: 'fish', 
            label: 'Fish'
        }, 
        {
            value: 'bird', 
            label: 'Bird'
        }, 
        {
            value: 'small', 
            label: 'Mouse, Hamster, Rabbit, etc'
        }
    ]

    const clinicOptions = [
        {
            value: 'Toronto Animal Services', 
            label: 'Toronto Animal Services'
        }, 
        {
            value: 'Dog Tales Rescue & Sanctuary', 
            label: 'Dog Tales Rescue & Sanctuary'
        }, 
        {
            value: 'Fishie Friends', 
            label: 'Fishie Friends'
        }, 
        {
            value: 'New Beginnings!', 
            label: 'New Beginnings!'
        }, 
        {
            value: 'Petland', 
            label: 'Petland'
        }
    ]

    const selectStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '2px dotted grey', 
            color: 'black'
        })
    }

    return (
        <div className="preferencesSection">

            <h6> Age Preference (years) </h6> 
            <RcRange
                onChange={(value) => this.props.onPreferenceAgeChange(value)} 
                tipFormatter={(value) => `${value}`}
                tipProps={{ visible: true }}
                defaultValue={[0, 10]}
                min={0}
                max={100}
                className="slider"
            />
        

            <h6> Location slider (km) </h6>
            <RcRange
                onChange={(value) => this.props.onPreferenceDistanceChange(value)} 
                tipFormatter={(value) => `${value}`}
                tipProps={{ visible: true }}
                defaultValue={[0, 10]}
                min={0}
                max={100}
                className="slider"
            />
            

            <h6> Pet Selections </h6> 
            <Select 
                autoFocus
                isMulti
                options={petOptions} 
                styles={selectStyles}
                onChange={this.props.onPetSelectChange}
                className="preferencesElement"
            />

            <h6> Clinic Filter </h6> 
            <Select
                autoFocus
                isMulti
                options={clinicOptions}
                styles={selectStyles}
                onChange={this.props.onClinicSelectChange}
                placeholder="Search..."
                className="preferencesElement"
            />
        </div> 

    );
  }
}

export default PreferencesSection;
