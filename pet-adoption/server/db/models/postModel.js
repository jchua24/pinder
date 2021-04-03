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
        enum: ['Dog', 'Cat', 'Fish', 'Bird', 'Mouse', 'Hamster', 'Rabbit'], 
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
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
    clinicID: {
        type: String,
        required: true
    },
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
    petOwnerID: {
        type: String, 
        required: false
    }
});

PostSchema.set('toJSON', {
    virtuals: true
});


module.exports = { PostSchema };