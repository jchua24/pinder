/* 
Handles endpoints for the pet carousel (get all postings, get individual posting)
*/ 

const express = require('express');
const router = express.Router() 

const { Pet } = require("../db/models/postModel");
const { ObjectID } = require('mongodb')
const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const {authenticate} = require('../helpers/auth');
const {mongoChecker, isMongoError} = require('../helpers/mongo');


//TO-DO: retrieve all relevant postings (TO-DO: factor in user preferences)
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


module.exports = router; 