const mongoose = require('mongoose')

const userModel = mongoose.model('User',
    {
        id: Number,
        firstName: String,
        lastName: String,
        username: String,
        birthYear: Number
    });

module.exports = userModel;