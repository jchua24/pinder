/* 
Handles endpoints for user interactions with the pet carousel
*/ 

const express = require('express');
const router = express.Router() 

const { Pet } = require("../db/models/postModel");
const { ObjectID } = require('mongodb')
const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const {authenticate} = require('../helpers/auth');
const {mongoChecker, isMongoError} = require('../helpers/mongo');


//retrieve all pets (TO-DO: factor in user preferences)
router.post("/", authenticate, mongoChecker, async (req, res) => {
    try {
        const pets = await Pet.find().exec();

        if(pets == null) {
            return res.sendStatus(404); //pet not found 
        } 
    
        return res.send(pets);
    } catch (error) {
        if(isMongoError(error)) {
            
        } else {
            console.log(error);
            return res.sendStatus(400); 
        }

    }
});

//get details for specific pet 
router.get("/:id", authenticate, mongoChecker, async (req, res) => {

    //Validate id immediately.
	if (!ObjectID.isValid(id)) {
		return res.sendStatus(404);
	}
    
    try {
        const pet = await Pet.findOne({ _id: req.params.id }).exec();

        if(pet == null) {
            return res.sendStatus(404); //pet not found 
        } 
    
        return res.send(pet);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400); 
    }
});


module.exports = router; 