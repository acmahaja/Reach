const mongoose = require('mongoose');


const mongooseSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    moods: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: false
    },
})

module.exports = mongooseSchema;