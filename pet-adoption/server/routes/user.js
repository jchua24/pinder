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

//get individual user data 
router.get("/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) || !ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID.');
    }

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

//update profile picture 
router.patch("/pic/", authenticate, mongoChecker, async (req, res) => {   

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

    if(!("preferences" in req.body)) {
        return res.status(400).send('Preferences object missing in request.');
    }

    try {
        const user = req.user; 
        user.preferences = user.preferences.create(req.body.preferences); 
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

    if("status" in req.body) { 
        //filters by status (e.g pending, completed, etc)
        return req.user.petApplications.filter((posting) => posting.status == req.body.status);
    } 
        
    return res.send(req.user.petApplications); //send all postings by default
});

//get specific application
router.get("/applications/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) || !ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } 

    //find posting subdocument  
    const application = req.user.petApplications.id(req.params.id);

    if(!application) {
        return res.status(404).send('Application not found');
    }
        
    return res.send(application); //send application
});

//add application
router.post("/applications/", authenticate, mongoChecker, async (req, res) => {

    if(!("postingID" in req.body && "clinicID")) {
        return res.status(400).send('One of the required fields (postingID, clinicID) was not included in the request.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for admin users.'); 
    } 

    try{
        const application = req.user.petApplications.create({
            userID: req.user._id, 
            clinicID: req.body.clinicID, 
            postingID: req.body.postingID, 
            status: "pending",
            comment: req.body.comment || ""
        }); 

        const adminUser =  User.findById(clinicID).exec(); 

        if(!adminUser || !adminUser.admin) { 
            return res.status(400).send('Clinic specified in request is not a valid clinic user.');
        } 
           
        //add (alert?) new application to clinic 
        adminUser.petApplications.push(application); 
        adminUser.save(); 
          
        req.user.petApplications.push(application);
        req.user.save(); 

        return res.sendStatus(200);
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

    if(!("id" in req.params) || !Object.isValid(req.params.id)) {
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
        user.petApplications.remove(req.params.id); 
        user.save(); 

        const adminUser =  User.findById(application.clinicID).exec(); 
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

module.exports = router; 


