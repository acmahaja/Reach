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

    time: {
        type: Number,
        required: false
    },
})

module.exports = mongooseSchema;