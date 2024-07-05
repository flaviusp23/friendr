const mongoose = require('mongoose')

const commentModel = mongoose.model('Comment',{
    id: String,
    user_id:String,
    post_id:String,
    date:String,
    description:String
})

module.exports = commentModel