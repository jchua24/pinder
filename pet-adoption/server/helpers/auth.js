/* 
Helper functions to facilitate JWT authentication. 
*/ 

const bcrypt = require('bcrypt');
const { User } = require("../db/models/userModel");

module.exports = {

    authenticate: async (req, res, next) => {

        console.log('session: ' + JSON.stringify(req.session));


        if (req.session.user) {

            const user = await User.findById(req.session.user).exec(); 

            if(user != null) {
                req.user = user
                next()
            } else {
                return res.sendStatus(401); //unauthorized; 
            }
		} else {
			return res.sendStatus(401); //unauthorized; 
		}
    },

    sessionChecker: async (req, res, next) => {		
	    if (req.session.user) {
            const user = await User.findById(req.session.user).exec(); 

            if(user != null) {
                return res.send(user); 
            } 
	    }   
        next(); //proceed to auth routes
	}, 

    verifyPassword: (input_str, hash) => {
        const passwordMatches = bcrypt.compareSync(input_str, hash); 

        if(passwordMatches) { //input string matches hash
            return true; 
        } 
        return false; 
    }, 
        
    hashPassword: (input_str) =>  {
        const hash = bcrypt.hashSync(input_str, 10);
        
        if (hash) {
            return hash; 
        } else {
            throw err;
        }
    }
}







    

