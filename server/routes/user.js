/* 
Handles endpoints for user actions 
*/ 

const express = require('express');
const router = express.Router() 

// import the user model
const { User } = require("../db/models/userModel");

// mongoose and mongo connection
const { ObjectID } = require('mongodb');
const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const {authenticate} = require('../helpers/auth');
const {mongoChecker, isMongoError} = require('../helpers/mongo');
const {getRadiusValues, isMatch} = require('../helpers/misc');


//update profile picture 
router.patch("/pic", authenticate, mongoChecker, async (req, res) => {   


    if(!req.body.hasOwnProperty("profilePic")) {
        return res.status(400).send('Invalid request - missing profilePic field.');
    }

    try {
        const user = req.user; 
        user.profilePic = req.body.profilePic; 
        await user.save(); 

        return res.sendStatus(200);
    } catch(error) {
        console.log(error);

        if(isMongoError(error)) {
            return res.sendStatus(500); //internal server error
        } 
        return res.sendStatus(400); //bad request 
    } 
}); 

//update user preferences
router.put("/preferences/", authenticate, mongoChecker, async (req, res) => {

    if(!req.body.hasOwnProperty("preferences")) {
        return res.status(400).send('Preferences object missing in request.');
    }

    try {
        const user = req.user; 
        user.preferences = req.body.preferences; 
        await user.save(); 

        return res.sendStatus(200);
    } catch(error) {
        console.log(error);

        if(isMongoError(error)) {
            return res.sendStatus(500); //internal server error
        } 
        return res.sendStatus(400); //bad request 
    } 
})

// ------------------------------------- application endpoints --------------------------------------------

//get all pet applications 
router.get("/applications", authenticate, mongoChecker, async (req, res) => {
    
    if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } 

    if(req.body.hasOwnProperty("status")) { 

        const statuses = ["pending", "approved", "expired", "rejected"]; 

        if(!(req.body.status in statuses)) {
            return res.status(400).send('Invalid status provided'); 
        }
        //filters by status (e.g pending, completed, etc)
        return req.user.petApplications.filter((application) => application.status == req.body.status);
    } 
        
    return res.send(req.user.petApplications); //send all applications by default
});

//get specific application
router.get("/applications/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params && ObjectID.isValid(req.params.id))) {
        return res.status(400).send('Invalid ID.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } 

    //find application subdocument  
    const application = req.user.petApplications.id(req.params.id);

    if(!application) {
        return res.status(404).send('Application not found');
    }
        
    return res.send(application); //send application
});

//add application
router.post("/applications", authenticate, mongoChecker, async (req, res) => {

    if(!(req.body.hasOwnProperty("postingID") && req.body.hasOwnProperty("clinicID") && req.body.hasOwnProperty("clinicName") && req.body.hasOwnProperty("clinicAddress")
    && ObjectID.isValid(req.body.postingID) && ObjectID.isValid(req.body.clinicID))) {
        return res.status(400).send('One of the required fields (postingID, clinicID) was not included in the request.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } 

    try{
        const application = req.user.petApplications.create({
            userID: req.user._id, 
            clinicID: req.body.clinicID, 
            clinicName: req.body.clinicName, 
            clinicAddress: req.body.clinicAddress,
            postingID: req.body.postingID, 
            status: "pending"
        }); 

        const adminUser = await User.findById(req.body.clinicID).exec(); 

        if(!adminUser || !adminUser.admin) { 
            return res.status(400).send('Clinic specified in request does not exist.');
        } 
           
        //check if posting exists and is valid 
        const posting = adminUser.petPostings.id(req.body.postingID); 
        if(!posting) {
            return res.status(400).send('Posting specified in request does not exist.');
        } else if (posting.status != "pending") {
            return res.status(400).send('Posting is no longer available for applications.');
        }

        //check if user has already applied to this posting
        if(!req.user.petApplications.every((application) => application.postingID != req.body.postingID)) {
            return res.status(400).send('User has already applied to this posting.');
        }


        //add user questionnaire to application 
        if("questionnaire" in req.user && req.user.questionnaire != {}) {
            application["questionnaire"] = req.user.questionnaire; 
        } else {
            application["questionnaire"] = {}; 
        }


        //add new application to clinic 
        adminUser.petApplications.push(application); 
        adminUser.save(); 
          
        req.user.petApplications.push(application);
        req.user.save(); 

        return res.send({"application": application, "user" : req.user});
    } catch(error) {
        console.log(error); 

        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error');
		} else {
			res.status(400).send('Bad Request'); // 400 for bad request gets sent to client.
		}
    }
});


//delete specific application
router.delete('/applications/:id', authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params && ObjectID.isValid(req.params.id))) {
        return res.status(400).send('Invalid ID.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } 

    try {
        const application = req.user.petApplications.id(req.params.id);

        if(!application) {
            return res.status(404).send('Application not found');
        }

        //remove application from user's list 
        req.user.petApplications.remove(req.params.id); 
        req.user.save(); 

        const adminUser = await User.findById(application.clinicID).exec(); 
        if(!adminUser || !adminUser.admin) { 
            return res.status(400).send('Application deleted on user side, but corresponding clinic not found.');
        } 
           
        //remove application from clinic's list 
        adminUser.petApplications.remove(req.params.id); 
        adminUser.save(); 

        return res.sendStatus(200);
    } catch(error) {
        console.log(error); 

        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error');
		} else {
			res.status(400).send('Bad Request');// 400 for bad request gets sent to client.
		}
    }
}) 


//get specific post based on postingID
router.post("/post", authenticate, mongoChecker, async (req, res) => {

    if(!("postingID" in req.body && "clinicID" in req.body && ObjectID.isValid(req.body.postingID) && ObjectID.isValid(req.body.clinicID))) {
        return res.status(400).send('Invalid request - valid postingID / clinicID not provided.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } 

    try {
        const adminUser = await User.findOne({ _id: req.body.clinic}).exec();

        if(user != null) {
            const posting = adminUser.petApplications.id(req.body.postingID); 

            if(!posting) {
                return res.status(404).send('Posting not found.');
            }
            return res.send(posting); 
        } else {
            return res.status(404).send('Clinic not found.');
        }
    } catch (error) {
        console.log(error); 
        
    	if (isMongoError(error)) { 
            return res.sendStatus(500);
		} else {
            return res.sendStatus(400);
		} 
    }
});

//get all relevant postings by searching with user preferences
router.get("/posts", authenticate, mongoChecker, async (req, res) => {

    if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    }

    let userLat = req.user.latitude;
    let userLong = req.user.longitude; 

    try {
        const criteria = {}; 

        if("radius" in req.user.preferences) {   //latitude-longitude filters
            const radius = getRadiusValues(userLat, userLong, req.user.preferences.radius); 
            criteria["latitude"] = {"$gte" : radius["lowlat"], "$lte": radius["upperlat"]};
            criteria["longitude"] = {"$gte" : radius["lowlng"], "$lte": radius["upperlng"]}; 
        }

        if("clinic" in req.user.preferences && req.user.preferences.clinic.length > 0) {
           criteria["name"] =  {"$in" : req.user.preferences.clinic};
        }

        //specify admin
        criteria["admin"] = {"$eq" : true};

        //get up to 100 randomly sampled admin users that meet the query criteria
        const users = await User.find(criteria).exec(); 

        if(users == null || users.length == 0) {
            return res.send([]);
        } 

        const postings = []; 
        const alreadyApplied = []; 
        
        //get list of postings user has already applied to 
        req.user.petApplications.forEach((posting) => {
            alreadyApplied.push(posting.postingID); 
        })

        users.forEach((user) => {
            //find matching pet types and age
            const matchPostings = user.petPostings.filter((posting) => isMatch(posting, req.user.preferences) && !(posting._id in alreadyApplied)); 
            postings.push(...matchPostings); 
        })

        return res.send(postings); 
    } catch (error) {
        console.log(error); 
        
    	if (isMongoError(error)) { 
            return res.sendStatus(500);
		} else {
            return res.sendStatus(400);
		} 
    }
});


//get user application data 
router.get("/questionnaire", authenticate, mongoChecker, async (req, res) => {

    if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    }

    if("questionnaire" in req.user && req.user.questionnaire != {}) {
        return res.send(req.user.questionnaire); 
    } else {
        return res.send(404).status("No questionnaire data found for this user."); 
    }
});

//set user application data 
router.put("/questionnaire", authenticate, mongoChecker, async (req, res) => {

    if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } else if (!("questionnaire" in req.body)) {
        return res.status(401).send('Invalid request - questionnaire data not provided.'); 
    }

    try {
        req.user.questionnaire = req.body.questionnaire; 
        req.user.save(); 
        return res.sendStatus(200);
    } catch(error) {
        console.log(error);

        if(isMongoError(error)) {
            return res.sendStatus(500); //internal server error
        } 
        return res.sendStatus(400); //bad request 
    }  
});

//get individual user data 
router.get("/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params && ObjectID.isValid(req.params.id))) {
        return res.status(400).send('Invalid ID.');
    }

    console.log(req.params.id);

    try {
        const user = await User.findOne({ _id: req.params.id }).exec();

        if(user != null) {
            return res.send(user); 
        } else {
            return res.status(404).send('User not found with specified email/password.');
        }

    } catch(error) {
        console.log(error);

        if(isMongoError(error)) {
            return res.sendStatus(500); //internal server error
        } 
        return res.sendStatus(400); //bad request 
    }
});

module.exports = router; 


