const commentsServices = require("../services/commentsServices");

const commentsController = {
    getComment: async(req,res) =>{
        console.log("\nReached GET comments controller")
        const commentId = req.params.id;
        console.log(commentId)
        const commentObj = await commentsServices.getComment(commentId);
        res.status(200).json(commentObj);
    },
    createComment: async(req,res) =>{
        console.log("\nReached POST comments controller")
        const commentObj= req.body;
        console.log(commentObj)
        if(!commentObj ||
           !commentObj?.username ||
           !commentObj?.post_id ||
           !commentObj?.content
        ){
            res.status(400).json({message: "Invalid comment object"})
            return;
        }
        commentsServices.createComment(commentObj);
        res.status(201).json({message:"Comment created"});
    },
    getAllComments: async(req,res) =>{
        console.log("\nReached GET ALL comments controller")
        const postId = req.query.postId;
        console.log(postId)
        const comments = await commentsServices.getAllComments(postId);
        res.status(200).json(comments);
    }
}

module.exports = commentsController