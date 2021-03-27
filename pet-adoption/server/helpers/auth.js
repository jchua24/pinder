/* 
Helper functions to facilitate JWT authentication. 
*/ 

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = {

    authenticateToken: (req, res, next) => {
    
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
    
        if (token == null) {
            return res.sendStatus(401) // unauthorized
        }
      
        jwt.verify(token, process.env.TOKEN_SECRET, (err, hashed_details) => {
          if (err) {
            return res.sendStatus(401) // unauthorized
          }
          req.hashed_details = hashed_details
          next() // pass the execution off to whatever request the client intended
        })
    }, 

    hashPassword: (input_str) =>  {

        const hash = bcrypt.hashSync(input_str, 10);
        
        if (hash) {
            return hash; 
        } else {
            throw err;
        }
    }, 
    
    verifyPassword: (input_str, hash) => {

        const passwordMatches = bcrypt.compareSync(input_str, hash); 
    
        if(passwordMatches) { //input string matches hash
            return true; 
        } 
        return false; 
    }, 

    generateAccessToken: (email, name) => {
        // expires after half and hour (1800s seconds = 30 minutes)
        return jwt.sign({to_sign: email + name}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    }
}







    

