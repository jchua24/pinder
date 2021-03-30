/* 
Handles endpoints for user interactions with the pet carousel
*/ 

const express = require('express');
const router = express.Router() 

// import the user model
const { Pet } = require("../db/models/petModel");

// mongoose and mongo connection
const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues


//retrieve all pets (TO-DO: factor in user preferences)
router.post("/", authenticateToken, async (req, res) => {
    try {
        const pets = await Pet.find().exec();

        if(pets == null) {
            return res.sendStatus(404); //restaurant not found 
        } 
    
        return res.send(pets);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400); 
    }
});

//get details for specific pet 
router.get("/:id", authenticateToken, async (req, res) => {
    
    try {
        const pet = await Pet.findOne({ _id: req.params.id }).exec();

        if(pet == null) {
            return res.sendStatus(404); //restaurant not found 
        } 
    
        return res.send(pet);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400); 
    }
});


module.exports = router; 