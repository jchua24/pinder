import React from "react";
import "./PreferencesSection.css";
import Select from 'react-select';
import RcSlider, {createSliderWithTooltip} from 'rc-slider';
import { Button } from "react-bootstrap";
import 'rc-slider/assets/index.css';

const RcRange = RcSlider.createSliderWithTooltip(RcSlider.Range);
const ToolTipSlider = createSliderWithTooltip(RcSlider);


class PreferencesSection extends React.Component {

    constructor(props) {
        super(props);
    }  

    convertSelectedPets(selectedPets) {

        const petOptionDict = {
            'dog': {
                value: 'dog', 
                label: 'Dog'
            }, 
            'cat': {
                value: 'cat', 
                label: 'Cat'
            }, 
            'fish':  {
                value: 'fish', 
                label: 'Fish'
            }, 
            'bird': {
                value: 'bird', 
                label: 'Bird'
            }, 
            'hamster' : {
                value: 'hamster', 
                label: 'Hamster'
            }, 
            'rabbit': {
                value: 'rabbit', 
                label: 'Rabbit'
            }
        }

        let to_return = []; 

        selectedPets.forEach((petName) => {
            to_return.push(petOptionDict[petName]);
        })

        return to_return; 
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
                value: 'hamster', 
                label: 'Hamster'
            }, 
            {
                value: 'rabbit', 
                label: 'Rabbit'
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

                {this.props.user.preferences && 
                    <div> 
                        <h6> Age Preference (years) </h6> 
                        <RcRange
                            onChange={(value) => this.props.onPreferenceAgeChange(value)} 
                            tipFormatter={(value) => `${value}`}
                            tipProps={{ visible: true }}
                            defaultValue={this.props.user.preferences.age}
                            min={0}
                            max={100}
                            className="slider"
                            handleStyle={{borderColor: '#17a2b8', backgroundColor: 'white'}}
                            trackStyle={[{backgroundColor: "#17a2b8"}]}
                        />
                    

                        <h6> Radius (km) </h6>
                        <ToolTipSlider
                            onChange={(value) => this.props.onPreferenceDistanceChange(value)} 
                            tipFormatter={(value) => `${value}`}
                            tip
                            tipProps={{ visible: true }}
                            defaultValue={this.props.user.preferences.radius}
                            min={0}
                            max={100}
                            className="slider"
                            handleStyle={{borderColor: '#17a2b8', backgroundColor: 'white'}}
                            trackStyle={[{backgroundColor: "#17a2b8"}]}
                        />
                        <h6> Pet Selections </h6> 
                        <Select 
                            defaultValue={this.convertSelectedPets(this.props.user.preferences.petTypes)}
                            autoFocus
                            isMulti
                            options={petOptions} 
                            styles={selectStyles}
                            onChange={this.props.onPetSelectChange}
                            className="preferencesElement"
                        />

                        <Button onClick={this.props.onUpdatePreferences}>Save</Button>
                    </div> 
                }          
            </div> 

        );
    }
}

export default PreferencesSection;
