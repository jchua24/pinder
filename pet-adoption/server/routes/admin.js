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


//get all pet postings 
router.get("/postings", authenticate, mongoChecker, async (req, res) => {

    if(!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    } 

    if("status" in req.body) { //send all pending postings
        return req.user.petPostings.filter((posting) => posting.status == req.body.status);
    } 
        
    return res.send(req.user.petPostings); //send all postings by default
});

//get specific pet posting
router.get("/postings/:id", authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) || !ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID.');
    } else if (!req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    }

    //find posting subdocument  
    const posting = req.user.petPostings.id(req.params.id);

    if(!posting) {
        return res.status(404).send('Reservation not found');
    }
        
    return res.send(posting); //send all postings by default
});



//delete specific posting
router.delete('/postings/:id', authenticate, mongoChecker, async (req, res) => {

    if(!("id" in req.params) || !ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID.');
    } else if(req.user.admin) {
        return res.status(401).send('Endpoint unauthorized for non-admin users.'); 
    } 

    try {
        user.petPostings.remove(req.params.id); 
        user.save(); 
    } catch(error) {
        console.log(error); 

        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error');
		} else {
			res.status(400).send('Bad Request'); // 400 for bad request gets sent to client.
		}
    }
}) 