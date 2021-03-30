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



//get individual user data 
router.get("/:id", authenticateToken, async (req, res) => {

    const user = await User.findOne({ _id: req.params.id }).exec();

    if(user != null) {
        return res.send(user); 
    } else {
        return res.sendStatus(404); //user not found
    }
});


//modify user (i.e profile update, preferences update, etc)




//submit application
router.put("/apply/:petID", authenticateToken, async (req, res) => {


});



module.exports = router; 


