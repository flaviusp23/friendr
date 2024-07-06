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
    },
    deleteOneComment: async(req,res) =>{
        console.log("\nReached DELETE comments controller")
        const commentId = req.params.id;
        console.log(commentId)
        await commentsServices.deleteOneComment(commentId);
        res.status(200).json({ message: "Comment deleted" });

    },
    deleteAllCommentsByPostId: async(req,res) => {
        console.log("\nReached DELETE BY POST ID comments controller")
        const postId = req.query.postId;
        console.log(postId)
        await commentsServices.deleteAllCommentsByPostId(postId);
        res.status(200).json({ message: "Comments by postId deleted" });

    }
}

module.exports = commentsController