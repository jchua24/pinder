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

const {verifyPassword, hashPassword, sessionChecker} = require("../helpers/auth"); 
const {mongoChecker, isMongoError} = require('../helpers/mongo');
const {calculateLatLong} = require("../helpers/misc");

//authenticate existing user 
router.post("/login", mongoChecker, sessionChecker,  async (req, res) => {

    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        return res.status(400).send('Invalid request - email or password is missing.');
    }   

    try {
        //attempt to attrieve existing user based on email
        const email = req.body.email.trim().toLowerCase(); 
        const existingUser = await User.findOne({email: email}).exec(); 

        if(existingUser != null) {
            const match = verifyPassword(req.body.password, existingUser.password); 

            if(match) {
                req.session.user = existingUser._id;
                req.session.email = existingUser.email;
                return res.send({id: req.session.user, user: existingUser});
            } 
        }

        return res.status(404).send("User not found with specified email/password.");
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
            return res.status(200).send("User successfully logged out.");
		}
	})
})

router.get('/sessionchecker', async (req, res) => {
    if (req.session.user) {
        const user = await User.findById(req.session.user).exec(); 

        if(user != null) {
            try{
                //required by frontend to make future api calls
                const response = {
                    id: user._id, 
                    user: user
                }
                return res.send(response);
            }
            catch(err){
                console.log(err);
                return res.status(400).send();
            }
        } 
    }   
    return res.status(401).send(); 

})

//adding new user to platform 
router.post("/add", sessionChecker, async (req, res) => {

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
            const hash = await hashPassword(req.body.password); 

            //get latlng coordinates 
            const fullAddress = req.body.address + " " + req.body.city + " " + req.body.province + " " + req.body.postal; 
            const coordinates = await calculateLatLong(fullAddress);

            const userDetails = {
                name: req.body.name, 
                email: email, 
                password: hash, 
                latitude: coordinates["latitude"], 
                longitude: coordinates["longitude"], 
                address: req.body.address, 
                city: req.body.city, 
                province: req.body.province,
                postal: req.body.postal, 
                phone: req.body.phone, 
                url: req.body.admin ? req.body.url : "", 
                admin: req.body.admin, 
                petApplications: [], 
                petPostings: [],
                preferences: {
                    age: [0, 100], 
                    radius: 100, 
                    petTypes: [],
                    clinic: []
                }, 
            }

            const newUser = new User(userDetails);  

            //persist user and generate access token
            const userAdded = await newUser.save();
    
            //required by frontend to make future api calls
            const response = {
                id: userAdded._id, 
                user: userAdded
            }

            req.session.user = userAdded._id;
            req.session.email = userAdded.email;
    
            return res.status(200).send(response);
        }
        catch (err) {
            console.log(err);
            return res.sendStatus(400);
        }

    } else {
        return res.status(409).send('User already exists.');
    }
});

module.exports = router; 
