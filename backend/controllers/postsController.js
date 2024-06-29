const postsServices = require("../services/postServices");

const postsController = {
    getPosts: async(req,res) =>{
        console.log("\nReached GET post controller");
        const postId = req.params.id
        console.log(postId)
        postObj = await postsServices.getPosts(postId)
        res.status(200).send(postObj);
    },
    createPosts: async(req,res) =>{
        console.log("\nReached POST post controller");
        const postToBeCreated = req.body
        console.log(postToBeCreated)
        if(!postToBeCreated ||
           !postToBeCreated?.id ||
           !postToBeCreated?.user_id ||
           !postToBeCreated?.title ||
           !postToBeCreated?.description){
           res.status(400).send("Invalid post Object")
           return
        }
        postToBeCreated.date = new Date().toString()
        postsServices.createPosts(postToBeCreated)
        res.status(201).send("Post created");
    },
    deletePosts: async(req,res) =>{
        console.log("\nReached DELETE post controller");
        const postId = req.query.id
        console.log(postId)
        postsServices.deletePosts(postId)
        res.status(200).send("Post deleted");
    }
}

module.exports = postsController;