/* 
Helper functions to facilitate JWT authentication. 
*/ 

const bcrypt = require('bcrypt');
const { User } = require("../db/models/userModel");

module.exports = {

    authenticate: (req, res, next) => {
        if (req.session.user) {

            const user = User.findById(req.session.user).exec(); 

            if(!user) {
                req.user = user
                next()
            } else {
                return res.sendStatus(401); //unauthorized; 
            }
		} else {
			return res.sendStatus(401); //unauthorized; 
		}
    }, 

    //finds user and verifies password
    login: (email, password) => {

        const user = User.findOne({ email: email }).exec(); 

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw "User not found with specified email/password";
        }

        return user; 
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







    

