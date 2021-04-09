import React from "react";
import {Button} from "react-bootstrap";
import "./ApplicationSection.css";

class ApplicationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    } 
  }  

  loadQuestionnaire(){
    this.props.history.push('/questionnaire');
  }
 

  render() {
    return (
      <Button type="button" className="btn btn-primary" onClick={() => this.loadQuestionnaire()}> Your Questionnaire </Button>
    );
  }
}

export default ApplicationSection;
