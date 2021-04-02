/* 
Handles endpoints for the pet carousel (get all postings, get individual posting)
*/ 

const express = require('express');
const router = express.Router() 

const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

//google maps import for geocoding 
const {Client} = require("@googlemaps/google-maps-services-js");

const {authenticate} = require('../helpers/auth');
const {mongoChecker, isMongoError} = require('../helpers/mongo');
const {getRadiusValues} = require ('../helpers/misc')


//retrieve all relevant postings (TO-DO: factor in user preferences)
router.post("/", authenticate, mongoChecker, async (req, res) => {

    if(!req.body.hasOwnProperty("preferences")) {
        return res.status(400).send('Invalid request - preferences object missing.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } 
   
    let userLat;
    let userLong; 

    try {
        const geoCodeParams = {
            address: req.user.address + " " + req.user.city + " " + req.user.province + " " + req.user.postal, 
            components: 'country:CA', 
            key: process.env.MAPS_API_KEY
        }

        //get user lat/long with geocode api
        const response = await Client.geocode({params: geoCodeParams}); 
        userLat = response.data.results[0].geometry.location.lat;
        userLong = data.results[0].geometry.location.lng;

    } catch(error) {
        console.log(error); 
        console.log("Unable to process user address, using hardcoded lat/lng of 27 Kings College Circle."); 

        userLat = 43.661370; 
        userLong = -79.396260; 
    }

    try {
        if("radius" in req.body.preferences) { 
            
            const userRadius = req.body.preferences.radius; 
            const radius = getRadiusValues(userLat, userLong, userRadius); 
          
            //latitude-longitude filters
            queries.push({"lat": {"$gte" : radius["lowlat"], "$lte": radius["upperlat"]}})
            queries.push({"lng": {"$gte" : radius["lowlng"], "$lte": radius["upperlng"]}})
        }

        if("clinic" in req.body.preferences) {
            queries.push({"name": {"$in" : req.body.preferences.clinic}});
        }

        //specify admin
        queries.push({"admin": {"$eq" : true}});

        //get up to 100 randomly sampled admin users that meet the query criteria
        const pipeline = [
            {"$match": {"$and" : queries}}, 
            {"$sample": {"size": 100}}
        ]

        //execute pipline and convert data to users
        const userData = await User.aggregate(pipeline).exec();  
        const users = userData.map(data => new User(data));

        const postings = []; 
        const alreadyApplied = []; 
        
        //get list of postings user has already applied to 
        req.user.petApplications.forEach((posting) => {
            alreadyApplied.push(posting.postingID); 
        })

        users.forEach((user) => {
            //find matching pet types and age
            const matchPostings = user.petPostings.filter((posting) => isMatch(posting.pet, req.body.preferences) && !(posting._id in alreadyApplied)); 
            postings.push(...matchPostings); 
        })

        return postings; 
    } catch (error) {
        console.log(error); 
        
    	if (isMongoError(error)) { 
            return res.sendStatus(500);
		} else {
            return res.sendStatus(400);
		} 
    }
});


module.exports = router; 