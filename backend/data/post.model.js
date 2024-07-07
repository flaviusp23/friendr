const mongoose = require('mongoose')

const postModel = mongoose.model('Post',{
    id: String,
    date:Date,
    author: String,
    title: String,
    description: String,
    likes: [String]
})

module.exports = postModel