/* 
Handles endpoints for user authentication and sign-up
*/ 

const express = require('express');
const router = express.Router() 

// import the user model
const { User } = require("../db/models/userModel");

// mongoose and mongo connection
const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const {hashPassword, sessionChecker, login} = require("../helpers/auth"); 
const {mongoChecker, isMongoError} = require('../helpers/mongo');

//authenticate existing user 
router.post("/", mongoChecker, async (req, res) => {

    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        return res.sendStatus(400); // bad request 
    }   

    try {
        //attempt to attrieve existing user based on email
        const email = req.body.email.trim().toLowerCase(); 
        const existingUser = await login(email, req.body.password);

        if(existingUser != null) {
            req.session.user = user._id;
            req.session.email = user.email
            return res.sendStatus(200);
        } else {
            return res.sendStatus(401);
        }

    } catch(error) {
        console.log(error); 
        
    	if (isMongoError(error)) { 
            return res.sendStatus(401);
		} else {
            return res.sendStatus(401);
		} 
    }
});

//user logout
router.get('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})


//adding new user to platform 
router.post("/add", async (req, res) => {

    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('name') ) {
        return res.sendStatus(400); // bad request  
    }   

    const email = req.body.email.trim().toLowerCase(); 

    //attempt to retrieve user from db  
    const existingUser = await User.findOne({ email: email }).exec();

    if (existingUser == null) { //create new user 
    
        try {

            const hash = hashPassword(req.body.password); 

            const userDetails = {
                name: req.body.name, 
                email: email, 
                password: hash, 
                latitude: 0, //to do
                longitude: 0, //to do
                address: req.body.address, 
                city: req.body.city, 
                province: req.body.province,
                postal: req.body.postal, 
                phone: req.body.phone, 
                url: req.body.url, 
                admin: req.body.admin, 
                petApplications: [], 
                petPostings: []
            }

            const newUser = new User(userDetails);  

            //persist user and generate access token
            const userAdded = await newUser.save();
            const accessToken = generateAccessToken(userAdded.email, userAdded.name); 
    
            //required by frontend to make future api calls
            const response = {
                id: userAdded._id, 
                access_token: accessToken
            }
    
            return res.send(response);
        }
        catch (err) {
            console.log("failed to persist new user: " + err);
            return res.sendStatus(400);
        }

    } else {
        console.log("user already exists");
        return res.sendStatus(409); //user already exists, send error         
    }
});






module.exports = router; 
