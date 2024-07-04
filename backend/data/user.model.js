const mongoose = require('mongoose')

const userModel = mongoose.model('User',
    {
        id: String,
        firstName: String,
        lastName: String,
        username: String,
        birthYear: Number,
        followers: [String] 
    });

module.exports = userModel;