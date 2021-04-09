/* 
Wrapper functions to call user endpoints 
*/

import axios from "axios";
import { logoutHelper } from "../helper";

import ENV from "../config.js";
const API_HOST = ENV.api_host;

//update user profile picture
export const apiUpdateProfilePicture = async (img_URI) => {
  const reqBody = {
    profilePic: img_URI,
  };

  try {
    await axios.patch(`${API_HOST}/api/user/pic`, reqBody);
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//update user preferences
export const apiUpdatePreferences = async (preferences) => {

  const reqBody = {
    preferences
  }

  console.log("preferences to send: " + JSON.stringify(reqBody));

  try {
    await axios.put(`${API_HOST}/api/user/preferences`, reqBody);
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

// ------------------------------------- application endpoints --------------------------------------------

//get applications this user has applied to (with optional status specified)
export const apiGetApplications = async (status) => {
  const reqBody = {};

  if (status != "") {
    reqBody["status"] = status;
  }

  try {
    const res = await axios.get(`${API_HOST}/api/user/applications`, reqBody);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//get specific application (based on id )
export const apiGetSpecificApplication = async (id) => {
  try {
    const res = await axios.get(`${API_HOST}/api/user/applications/${id}`);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//submit application (using postingID and clinicID)
export const apiSubmitApplication = async (postingID, clinicID) => {
  const reqBody = {
    postingID,
    clinicID,
  };

  try {
    const res = await axios.post(`${API_HOST}/api/user/applications`, reqBody);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//delete application (using postingID and clinicID)
export const apiDeleteApplication = async (applicationID) => {
  try {
    await axios.delete(`${API_HOST}/api/user/applications/${applicationID}`);
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//get all postings to display in pet swiper
export const apiGetPosts = async () => {
  try {
    const res = await axios.get(`${API_HOST}/api/user/posts`);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//get user questionnaire data
export const apiGetQuestionnaireData = async () => {
  try {
    const res = await axios.get(`${API_HOST}/api/user/questionnaire`);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//set user questionnaire data
export const apiSetQuestionnaireData = async (questionnaireData) => {
  const reqBody = {
    questionnaire: questionnaireData,
  };

  try {
    await axios.put(`${API_HOST}/api/user/questionnaire`, reqBody);
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//get individual user data
export const apiGetUserData = async (userID) => {
  try {
    await axios.put(`${API_HOST}/api/user/${userID}`);
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};
