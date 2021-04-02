/* 
Miscellaneous helper functions.
*/ 

const bcrypt = require('bcrypt');
const { User } = require("../db/models/userModel");

module.exports = {
    //calculates lower/upper bounds on lat/lng based on user latitude/longitude and desired radius
    getRadius: (userLat, userLong, userRadius) => {
        
        const radiusEarth = 6378.00; //in km
        const radiusValues = {}; 
        
        //calculate upper & lower bounds of radius circle
        radiusValues["lowlat"] = userLat - (userRadius/radiusEarth)*(180/Math.PI);
        radiusValues["upperlat"] = userLat + (userRadius/radiusEarth)*(180/Math.PI);
        radiusValues["lowlng"] = userLong - (userRadius/radiusEarth)*(180/Math.PI)/Math.cos(userLat*Math.PI/180);
        radiusValues["upperlng"] = userLong + (userRadius/radiusEarth)*(180/Math.PI)/Math.cos(userLat*Math.PI/180);

        return radiusValues; 
    }, 
    //returns a boolean representing whether or not a pet posting matches the desired criteria
    isMatch: (pet, preferences) => {

        const isMatch = true; 

        if("age" in preferences) { //check age range
            isMatch = preferences.age[0] <= pet.age && pet.age <= preferences.age[1]; 
        }

        if("petTypes" in preferences && preferences.petTypes.length > 0) {
            isMatch = isMatch && pet.type in preferences.petTypes; 
        }

        return isMatch; 
    }
}