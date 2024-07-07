const commentModel = require("../data/comment_model")
const {v4:uuidv4} = require('uuid')
const commentsServices = {
    getComment: async(commentId) =>{
        console.log("Reached GET comments services")
        console.log(commentId)
        const response = await commentModel.findOne({id:commentId},{});
        return response
    },
    createComment: (commentObj) =>{
        console.log("Reached POST comments services")
        console.log(commentObj)
        commentObj.id = uuidv4();
        commentObj.date = new Date().toISOString();
        const commentToBeCreated = new commentModel(commentObj);
        commentToBeCreated.save().then(() => console.log("Comment created"))
    },
    getAllComments: async(postId) =>{
        console.log("Reached GET ALL comments services")
        console.log(postId)
        const response = await commentModel.find({post_id:postId},{});
        return response
    },
    deleteOneComment: async(commentId) =>{
        console.log("\nReached DELETE comments services")
        console.log(commentId)
        const response = await commentModel.deleteOne({id:commentId})
        return response;
    },
    deleteAllCommentsByPostId: async(postId) =>{
        console.log("\nReached DELETE BY POST ID comments services")
        console.log(postId)
        const response = await commentModel.deleteMany({post_id:postId})
        return response;
    },
    updateComment: async (commentId, content) => {
        console.log("\nReached UPDATE comments services");
        console.log(commentId, content);
    
        await commentModel.updateOne(
            { id: commentId },
            { $set: { date: new Date(), content: content } }
        );
        console.log("Comment updated");
    }
}
module.exports = commentsServices