/*
User mongoose model
*/
const mongoose = require('mongoose');
mongoose.pluralize(null);

// import the pet model
const { PostSchema } = require("./postModel");


//pet application schema 
const ApplicationSchema = new mongoose.Schema({
    userID: {
        type: String, 
        required: true
    }, 
    clinicID: {
        type: String, 
        required: true
    }, 
    postingID: {
        type:String, 
        required: true
    }, 
    status: {
        type: String,
        required: true
    }, 
    comment: {
        type: String, 
        required: false
    }
})

//schema for user preferences object
const PreferencesSchema = new mongoose.Schema({
    age: {
        type: [Number],
        required: true
    }, 
    radius: {
        type: Number,
        required: true
    },
    petTypes: {
        type: [String],
        required: true
    }
})


// create an user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }, 
    province: {
        type: String,
        required: true
    }, 
    postal: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }, 
    url: {
        type: String, 
        required: false
    }, 
    admin: {
        type: Boolean, 
        required: true
    }, 
    profilePic: {
        type: String, 
        required: false
    },
    application: {
        type: Object, 
        required: false
    },
    preferences: PreferencesSchema, 
    petApplications: [ApplicationSchema], 
    petPostings: [PostSchema], //Note: regular users will never have any petPostings
    
});

userSchema.set('toJSON', {
    virtuals: true
});


// create an user model using the schema
const User = mongoose.model('user', userSchema);

module.exports = { User };