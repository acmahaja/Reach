const mongoose = require('mongoose');


const mongooseSchema = mongoose.Schema({

    _id: {
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
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    userPhoto: {
        data: Buffer,
        contentType: String,
        required: false
    },
})

module.exports = mongooseSchema;