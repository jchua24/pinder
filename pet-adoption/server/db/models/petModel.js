/*
Pet mongoose model
*/
const mongoose = require('mongoose');

//prevent mongoose from automatically pluralizing collection name
mongoose.pluralize(null);

// create a pet schema
const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    clinicID: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
        required: false
    }, 
    images: {
        type: [String], 
        required: false
    }
});

petSchema.set('toJSON', {
    virtuals: true
});

// create an user model using the schema
const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet };