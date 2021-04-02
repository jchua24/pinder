/* 
Handles endpoints for admin-specific actions
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


// ------------------------------------- posting endpoints --------------------------------------------

//get all pet postings from this user
router.get("/postings", authenticate, mongoChecker, async (req, res) => {

    if(!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    } 

    if(req.body.hasOwnProperty("status")) { //send all pending postings
        return req.user.petPostings.filter((posting) => posting.status == req.body.status);
    } 
        
    return res.send(req.user.petPostings); //send all postings by default
});

//get specific pet posting from this user
router.get("/postings/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) && ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid Posting ID.');
    } else if (!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    }

    //find posting subdocument  
    const posting = req.user.petPostings.id(req.params.id);

    if(!posting) {
        return res.status(404).send('Posting not found');
    }
        
    return res.send(posting); //send all postings by default
});

//add post
router.post("/postings", authenticate, mongoChecker, async (req, res) => {

    if(!req.body.hasOwnProperty("pet")) {
        return res.status(400).send('Invalid request - pet data not provided.');
    } else if (!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    }

    try {
        const posting = req.user.petPostings.create({
            pet: req.body.pet, 
            description: req.body.description || "", 
            status: "pending"
        }); 

        req.user.petPostings.push(posting); 
        req.user.save(); 

        return res.send({'posting': posting, 'user': req.user});

    } catch(error) {
        console.log(error); 

        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error');
		} else {
			res.status(400).send('Bad Request'); // 400 for bad request gets sent to client.
		}
    }
});

//modify existing posting 
router.patch("/postings/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) && ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid Posting ID.');
    } else if (!(req.body.hasOwnProperty("pet") || req.body.hasOwnProperty("description"))){
        return res.status(400).send('Invalid request - update fields missing.');
    } else if (!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    }

    try{

        //find all matching applications
        const posting = req.user.petPostings.id(req.params.id); 
        if(!posting) {
            return res.status(404).send('Posting not found.'); 
        }

        posting.set({pet: req.body.pet || posting.pet, description: req.body.description || posting.description}); 
        req.user.save(); 

        return res.send({'posting': posting, 'user': req.user}); 
    } catch(error) {
        console.log(error); 

        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error');
		} else {
			res.status(400).send('Bad Request'); // 400 for bad request gets sent to client.
		}
    } 
});

//delete specific posting
router.delete('/postings/:id', authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) && ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    } 

    try {
        //remove posting from user's postings lists
        req.user.petPostings.remove(req.params.id); 
    
        //all applications to this posting 
        const applications = req.user.petApplications.filter((application) => application.postingID == req.params.id); 

        //find all users who applied to this posting and mark their application as expired
        applications.forEach((application) => {
            const user = User.findById(application.userID).exec(); 

            if(user) {
                const userApplication = user.petApplications.id(application._id); 

                if(userApplication) {
                    userApplication.status = 'expired'; 
                    user.save(); 
                }
            }
        })
    
        //remove all applications received for this posting from admin's application list
        req.user.petApplications.pull({postingID: req.params.id}); 
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
}) 


// ------------------------------------- application endpoints --------------------------------------------

//get all applications received by the clinic
router.get("/applications", authenticate, mongoChecker, async (req, res) => {

    if(!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    } 

    if("status" in req.body) { //send all pending applications
        return req.user.petApplications.filter((application) => application.status == req.body.status);
    } 
        
    return res.send(req.user.petApplications); //send all applications by default
});

//get all applications recieved by this clinic for a specific posting
router.get("/applications/:postingID", authenticate, mongoChecker, async (req, res) => {

    if(!("postingID" in req.params) && ObjectID.isValid(req.params.postingID)) {
        return res.status(400).send('Invalid Posting ID.');
    } else if (!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    }

    //find all matching applications
    const applications = req.user.petApplications.filter((application) => application.postingID == req.params.postingID);
    return res.send(applications); 
});

//update application (approve)
router.get("/applications/approve/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) && ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid Application ID.');
    } else if (!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    }

    try{
        //get application based on id 
        const application = req.user.petApplications.id(req.params.id); 

        if(!application) {
            return res.status(404).send('Application not found.'); 
        }

        //remove accepted application from admin user application list 
        req.user.petApplications.remove(req.params.id);
        req.user.save();
 
        //update posting status and owner 
        const posting = req.user.petPostings.id(application.postingID); 
        if(!posting) {
            return res.status(404).send('Corresponding posting to approved application not found.'); 
        }
        posting.status = "approved"; 
        posting.petOwnerID = application.userID;
        req.user.save(); 
        
        //mark user application as approved 
        const regUser = User.findById(application.userID).exec(); 
        if(!regUser) {
            return res.status(404).send('Corresponding applicant user not found.'); 
        }
        const userApplication = regUser.petApplications.id(req.params.id); 
        userApplication.status = "approved"; 
        regUser.save(); 

        //all rejected applicants / applications
        const rejectedApplications = req.user.petApplications.filter((application) => application.postingID == posting._id && application._id != req.params.id); 

        //find all users who applied to this posting and mark their application as rejected
        rejectedApplications.forEach((application) => {
            const rejectedUser = User.findById(application.userID).exec(); 

            if(rejectedUser) {
                const userApplication = rejectedUser.petApplications.id(application._id); 

                if(userApplication) {
                    userApplication.status = 'rejected'; 
                    rejectedUser.save(); 
                }
            }
        })
    
        //remove all rejected applications from admin's application list
        req.user.petApplications.pull({postingID: posting._id}); 
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


//update application (reject)
router.get("/applications/reject/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) && ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid Application ID.');
    } else if (!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    }

    try{
        //get application based on id 
        const application = req.user.petApplications.id(req.params.id); 

        if(!application) {
            return res.status(404).send('Application not found.'); 
        }

        //remove application from admin user list 
        req.user.petApplications.remove(req.params.id);
        req.user.save();

        //mark regular user application as rejected 
        const regUser = User.findById(application.userID).exec(); 
        if(!regUser) {
            return res.status(404).send('Corresponding applicant user not found.'); 
        }
        const userApplication = regUser.petApplications.id(req.params.id); 
        userApplication.status = "rejected"; 
        regUser.save(); 

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


