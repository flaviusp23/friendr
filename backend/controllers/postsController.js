const postsServices = require("../services/postServices");

const postsController = {
    getPosts: async(req, res) => {
        console.log("\nReached GET post controller");
        const postId = req.params.id;
        console.log(postId);
        const postObj = await postsServices.getPosts(postId);
        res.status(200).json(postObj);
    },
    createPosts: async(req, res) => {
        console.log("\nReached POST post controller");
        const postToBeCreated = req.body;
        console.log(postToBeCreated);
        if (!postToBeCreated || 
            !postToBeCreated.author || 
            !postToBeCreated.title || 
            !postToBeCreated.description) {
            res.status(400).json({ message: "Invalid post object" });
            return;
        }
        await postsServices.createPosts(postToBeCreated);
        res.status(201).json({ message: "Post created" });
    },
    getAllPosts: async(req, res) => {
        console.log("\nReached GET ALL post controller");
        const postsObj = await postsServices.getAllPosts();
        res.status(200).json(postsObj);
    },
    updatePostLikes: async(req, res) => {
        console.log("\nReached UPDATE LIKES post controller");
        const postId = req.params.id;
        const username = req.body.username;
        if (!username) {
            res.status(400).json({ message: "Username is required" });
            return;
        }
        const postObj = await postsServices.getPosts(postId);
        if (!postObj) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        const likes = postObj.likes;

        if (likes.includes(username)) {
            await postsServices.removePostLikes(postId, username);
        } else {
            await postsServices.addPostLikes(postId, username);
        }
        const updatedPostObj = await postsServices.getPosts(postId);
        res.status(200).json(updatedPostObj);
    },
    deletePosts: async(req, res) => {
        console.log("\nReached DELETE post controller");
        const postId = req.query.id;
        console.log(postId);
        await postsServices.deletePosts(postId);
        res.status(200).json({ message: "Post deleted" });
    }
};

module.exports = postsController;
