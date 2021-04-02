/*
Post mongoose model (containing Pet model and other details)
*/
const mongoose = require('mongoose');
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

//pet posting schema 
const PostSchema = new mongoose.Schema({
    pet: {
        type: petSchema,
        required: true
    },
    description: {
        type: String,
        required: false
    }, 
    status: {
        type: String,
        required: true
    }, 
    ownerID: {
        type: String, 
        required: false
    }
});

PostSchema.set('toJSON', {
    virtuals: true
});


module.exports = { PostSchema };