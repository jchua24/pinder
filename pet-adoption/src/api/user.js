import axios from 'axios'; 

import ENV from "../config.js";
const API_HOST = ENV.api_host;

export const apiUpdateProfilePicture = async (img_URI) => {

    const reqBody = {
        "profilePic": img_URI 
    }

    try {
        await axios.patch(`${API_HOST}/api/user/pic`, reqBody); 
    } catch(error) {
        throw(error); 
    }
};

