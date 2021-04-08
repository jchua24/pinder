import React from "react";
import * as Survey from "survey-react";
import "./Questionnaire.css";
import "survey-react/survey.css";
import {userjson} from "./UserQuest.js";

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };
    this.json = userjson;
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }
  onCompleteComponent() {
    this.setState({ isCompleted: true });
  }
  render() {
    Survey.StylesManager.ThemeColors["default"]["$main-color"] = "#1A8FE6";
    Survey.StylesManager.applyTheme();
    return (
        <div className="Questionnaire">
        <Survey.Survey
          json={this.json}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
        />
        </div>
    );
  }
}

export default Questionnaire;