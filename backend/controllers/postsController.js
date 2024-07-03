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
           !postToBeCreated?.author ||
           !postToBeCreated?.title ||
           !postToBeCreated?.description){
           res.status(400).send("Invalid post Object")
           return
        }
        postsServices.createPosts(postToBeCreated)
        res.status(201).send("Post created");
    },
    getAllPosts: async(req,res) =>{
        console.log("\n Reached GET ALL post controller");
        const postsObj = await postsServices.getAllPosts();
        res.status(200).send(postsObj)
    },
    updatePostLikes: async(req,res)=>{
        console.log("\nReached UPDATE LIKES post controller");
        const postId = req.params.id;
        const username = req.body.username;
        
        const postObj = await postsServices.getPosts(postId);
        if(!postObj){
            res.status(404).send();
            return;
        }
        const likes = postObj.likes;

        if(likes.includes(username)){
            await postsServices.removePostLikes(postId,username);
        }
        else {
            await postsServices.addPostLikes(postId,username);
        }
        const updatedPostObj = await postsServices.getPosts(postId);//luam postare actualizata ca sa o trimitem
        res.status(200).send(updatedPostObj)
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