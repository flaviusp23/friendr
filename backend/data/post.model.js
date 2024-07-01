const mongoose = require('mongoose')

const postModel = mongoose.model('Post',{
    id: Number,
    date:String,
    user_id: Number,
    title: String,
    description: String
})

module.exports = postModel