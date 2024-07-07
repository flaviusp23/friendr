const mongoose = require('mongoose')

const commentModel = mongoose.model('Comment',{
    id: String,
    username:String,
    post_id:String,
    date:Date,
    content:String
})

module.exports = commentModel