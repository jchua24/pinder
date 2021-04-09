/* 
Miscellaneous helper functions.
*/ 

const bcrypt = require('bcrypt');
const { User } = require("../db/models/userModel");

//google maps import for geocoding 
const {Client} = require("@googlemaps/google-maps-services-js");

module.exports = {

    //takes in an address and returns the user's lat/lng coordinates
    calculateLatLong: async (address) => {

        let userLat; 
        let userLong; 

        try {
            const geoCodeParams = {
                address: address, 
                components: 'country:CA', 
                key: process.env.MAPS_API_KEY
            }
    
            //get user lat/long with geocode api
            const client = new Client({});
            const response = await client.geocode({params: geoCodeParams}); 
            userLat = response.data.results[0].geometry.location.lat;
            userLong = response.data.results[0].geometry.location.lng;
    
        } catch(error) {
            console.log(error); 
            console.log("Unable to process user address, using hardcoded lat/lng of 27 Kings College Circle."); 
    
            userLat = 43.661370; 
            userLong = -79.396260; 
        }

        return {"latitude": userLat, "longitude": userLong}; 
    }, 

    //calculates lower/upper bounds on lat/lng based on user latitude/longitude and desired radius
    getRadiusValues: (userLat, userLong, userRadius) => {
        
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
    isMatch: (posting, preferences) => {

        let isMatch = true; 
      
        if("age" in preferences) { //check age range
            isMatch = preferences.age[0] <= posting.pet.age && posting.pet.age <= preferences.age[1]; 
        }

        if("petTypes" in preferences && preferences.petTypes.length > 0) {
            isMatch = isMatch && posting.pet.type in preferences.petTypes; 
        }

        return posting.status == "pending" && isMatch; 
    }
}