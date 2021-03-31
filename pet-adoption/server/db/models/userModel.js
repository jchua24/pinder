/*
User mongoose model
*/
const mongoose = require('mongoose');

//prevent mongoose from automatically pluralizing collection name
mongoose.pluralize(null);


//pet posting schema 
const PostingSchema = new mongoose.Schema({
    petID: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }, 
    status: {
        type: String,
        required: true
    }
});

//pet application schema 
const ApplicationSchema = new mongoose.Schema({
    petID: {
        type: String,
        required: true
    },
    petName: {
        type: String,
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
        type: [String],
        required: true
    }, 
    distance: {
        type: [Number],
        required: true
    },
    petTypes: {
        type: [String],
        required: true
    }, 
    clinic: {
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
    preferences: PreferencesSchema, 
    petApplications: [ApplicationSchema], 
    petPostings: [PostingSchema], 
    
});

userSchema.set('toJSON', {
    virtuals: true
});


// create an user model using the schema
const User = mongoose.model('user', userSchema);

module.exports = { User };