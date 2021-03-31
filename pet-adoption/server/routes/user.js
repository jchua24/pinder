/* 
Handles endpoints for user profiles, etc 
*/ 

const express = require('express');
const router = express.Router() 

// import the user model
const { User } = require("../db/models/userModel");

// mongoose and mongo connection
const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const {authenticate} = require('../helpers/auth');
const {mongoChecker, isMongoError} = require('../helpers/mongo');

//get individual user data 
router.get("/:id", authenticate, mongoChecker, async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id }).exec();

        if(user != null) {
            return res.send(user); 
        } else {
            return res.sendStatus(404); //user not found
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
    } catch(error) {
        console.log(error);

        if(isMongoError(error)) {
            return res.sendStatus(500); //internal server error
        } 
        return res.sendStatus(400); //bad request 
    } 
}); 

//update user preferences
router.patch("/preferences/", authenticate, mongoChecker, async (req, res) => {

    try {
        const user = req.user; 
        user.preferences = req.body.preferences; 
        await user.save(); 
    } catch(error) {
        console.log(error);

        if(isMongoError(error)) {
            return res.sendStatus(500); //internal server error
        } 
        return res.sendStatus(400); //bad request 
    } 
})


//submit application
router.put("/apply/:petID", authenticate, async (req, res) => {


});



module.exports = router; 


