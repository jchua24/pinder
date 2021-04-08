import axios from 'axios'; 

import ENV from "../config.js";
const API_HOST = ENV.api_host;

export const apiCheckSession = async (app) => {

  try {
    const session = await axios.get(`${API_HOST}/api/auth/sessionchecker`); 
    return session.data; 
  } catch(error) {
    console.log(error); 
    throw(error); 
  }
};

export const apiLogin = async (email, password) => {

  const reqBody = {
    email, 
    password
  }

  try{
    const res = await axios.post(`${API_HOST}/api/auth/login`, reqBody); 
    console.log("login: " + JSON.stringify(res));
    return res.data; 
  } catch(error) {
    console.log(error); 
    throw(error); 
  }

};

export const apiSignUp = async (userData) => {
  try{
    const res = await axios.post(`${API_HOST}/api/auth/add`, userData); 
    return res.data; 
  } catch(error) {
    console.log(error); 
    throw(error); 
  }
};


export const apiLogout = async () => {

  try{
    await axios.get(`${API_HOST}/api/auth/logout`); 
  } catch(error) {
    console.log(error); 
    throw(error); 
  }
};
