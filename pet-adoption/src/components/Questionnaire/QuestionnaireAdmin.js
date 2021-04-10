import React from "react";
import * as Survey from "survey-react";
import "./Questionnaire.css";
import "survey-react/survey.css";
import { userjson } from "./UserQuest.js";

import {
  apiSetQuestionnaireData,
  apiGetQuestionnaireData,
  apiGetApplications,
} from "../../api/user";

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCompleted: false,
      questionnaireData: {},
    };

    this.json = userjson;
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  //attempt to pre-populate questionnaire data
  async componentDidMount() {
    try {
      // updated the database with the new information for the user

      // get id
      let id = this.props.history.location.pathname.split("/");
      if (id.length === 3) {
        id = id[2];

        let apps = await apiGetApplications();
        apps = apps.filter((app) => app.id === id)[0];
        let questionnaireData = apps.questionnaire;

        if (questionnaireData) {
          this.setState({ questionnaireData: questionnaireData });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onCompleteComponent(survey) {
    console.log(survey.valuesHash);

    try {
      // updated the database with the new information for the user
      await apiSetQuestionnaireData(survey.valuesHash);

      this.setState({ isCompleted: true });
      this.props.history.push("/swiper");
    } catch (error) {
      console.log(error);
      alert("Unable to submit questionnaire responses, please try again.");
    }
  }

  render() {
    Survey.StylesManager.ThemeColors["default"]["$main-color"] = "#1A8FE6";
    Survey.StylesManager.applyTheme();

    //initializing questions
    let survey = new Survey.Model(this.json);

    //settings answers, if we have any
    survey.data = this.state.questionnaireData;

    //Read Only
    survey.mode = "display";
    return (
      <div className="Questionnaire">
        <Survey.Survey
          model={survey}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
        />
      </div>
    );
  }
}

export default Questionnaire;
