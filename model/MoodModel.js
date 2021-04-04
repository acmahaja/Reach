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
    mood: {
        type: Number,
    },
    sleep: {
        type: Number,
    },
    meals: {
        type: Number,
    },
    people: {
        type: Number
    },
    description: {
        type: String,
        required: false
    },
})

module.exports = mongooseSchema;