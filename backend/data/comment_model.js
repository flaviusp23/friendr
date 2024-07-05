const mongoose = require('mongoose')

const commentModel = mongoose.model('Comment',{
    id: String,
    username:String,
    post_id:String,
    date:String,
    content:String
})

module.exports = commentModel