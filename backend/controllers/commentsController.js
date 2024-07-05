const commentsServices = require("../services/commentsServices");

const commentsController = {
    getComment: async(req,res) =>{
        console.log("\nReached GET comment controller")
        const commentId = req.params.id;
        console.log(commentId)
        const commentObj = await commentsServices.getComment(commentId);
        res.status(200).json(commentObj);
    },
    createComment: async(req,res) =>{
        console.log("\nReached POST comment controller")
        const commentObj= req.body;
        console.log(commentObj)
        if(!commentObj ||
           !commentObj?.user_id ||
           !commentObj?.post_id ||
           !commentObj?.content
        ){
            res.status(400).json({message: "Invalid comment object"})
            return;
        }
        commentsServices.createComment(commentObj);
        res.status(201).json({message:"Comment created"});
    }
}

module.exports = commentsController