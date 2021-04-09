/* 
Wrapper functions to call user endpoints 
*/

import axios from "axios";
import { logoutHelper } from "../helper";

import ENV from "../config.js";
const API_HOST = ENV.api_host;

//get all pet postings from this admin user
export const apiGetPostings = async (status) => {
  const reqBody = {};

  if (status !== "") {
    reqBody["status"] = status;
  }

  try {
    const res = await axios.get(`${API_HOST}/api/admin/postings`, reqBody);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//get specific posting from this admin user
export const apiGetPosting = async (postingID) => {
  try {
    const res = await axios.get(`${API_HOST}/api/admin/postings/${postingID}`);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//submit a new post
export const apiSubmitPosting = async (pet, clinicID, description) => {
  const reqBody = {
    pet,
    clinicID,
    description,
  };

  try {
    const res = await axios.post(`${API_HOST}/api/admin/postings`, reqBody);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//modify a new post
export const apiModifyPosting = async (postingID, updateObject) => {
  try {
    const res = await axios.patch(
      `${API_HOST}/api/admin/postings/${postingID}`,
      updateObject
    );
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//delete a post
export const apiDeletePosting = async (postingID) => {
  try {
    await axios.delete(`${API_HOST}/api/admin/postings/${postingID}`);
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//get all applications this admin user has received
export const apiGetApplications = async () => {
  try {
    const res = await axios.get(`${API_HOST}/api/admin/applications`);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//get all applications for a specific posting
export const apiGetApplicationsForPosting = async (postingID) => {
  try {
    const res = await axios.get(
      `${API_HOST}/api/admin/applications/${postingID}`
    );
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//approve application
export const apiApproveApplication = async (applicationID) => {
  try {
    const res = await axios.get(
      `${API_HOST}/api/admin/applications/approve/${applicationID}`
    );
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};

//reject application
export const apiRejectApplication = async (applicationID) => {
  try {
    const res = await axios.get(
      `${API_HOST}/api/admin/applications/reject/${applicationID}`
    );
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      logoutHelper();
    } else {
      throw error;
    }
  }
};
