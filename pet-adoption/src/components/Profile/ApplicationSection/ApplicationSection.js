import React from "react";
import { Tabs, Button, Tab, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import ImageUploading from 'react-images-uploading';
import ReactRoundedImage from "react-rounded-image";

import "./ApplicationSection.css";
import Select from 'react-select';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
const RcRange = RcSlider.createSliderWithTooltip(RcSlider.Range);


class ApplicationSection extends React.Component {
  constructor() {
    super();
    this.state = {
    } 
  }  

  loadQuest(){
    this.props.history.push('/questionnaire');
  }
 

  render() {
    return (
      <Button type="button" className="btn btn-primary" onClick={() => this.loadQuest()}> Your Questionnaire </Button>
    );
  }
}

export default ApplicationSection;
