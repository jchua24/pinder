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

const {login} = require("../helpers/auth"); 
const {mongoChecker, isMongoError} = require('../helpers/mongo');

//authenticate existing user 
router.post("/login", mongoChecker, async (req, res) => {

    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        return res.status(400).send('Invalid request - email or password is missing.');
    }   

    try {
        //attempt to attrieve existing user based on email
        const email = req.body.email.trim().toLowerCase(); 
        const existingUser = await login(email, req.body.password);

        if(existingUser != null) {
            req.session.user = user._id;
            req.session.email = user.email;
            return res.sendStatus({id: req.session.user, user: existingUser});
        } else {
            return res.status(404).send("User not found with specified email/password.");
        }

    } catch(error) {
        console.log(error); 
        
    	if (isMongoError(error)) { 
            return res.sendStatus(500);
		} else {
            return res.sendStatus(400);
		} 
    }
});

//user logout
router.get('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error);
		} else {
			return res.sendStatus(200);
		}
	})
})


//adding new user to platform 
router.post("/add", async (req, res) => {

    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('name') ||  !req.body.hasOwnProperty('address')
    || !req.body.hasOwnProperty('address') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('province') ||  !req.body.hasOwnProperty('postal') || 
    !req.body.hasOwnProperty('phone') || !req.body.hasOwnProperty('admin')) {
        return res.status(400).send('Invalid request - email, password or name is missing.');
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
    
            //required by frontend to make future api calls
            const response = {
                id: userAdded._id, 
                user: userAdded
            }
    
            return res.send(response);
        }
        catch (err) {
            return res.sendStatus(400);
        }

    } else {
        return res.status(409).send('User already exists.');
    }
});

module.exports = router; 
