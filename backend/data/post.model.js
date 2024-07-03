const mongoose = require('mongoose')

const postModel = mongoose.model('Post',{
    id: String,
    date:String,
    author: String,
    title: String,
    description: String,
    likes: [String]   // un array de userid cu cine a dat like
})

module.exports = postModel