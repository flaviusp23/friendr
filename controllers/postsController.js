const postsServices = require("../services/postServices");

const postsController = {
    createPosts: (postObj) => {
        console.log("Reached post controller");
        console.log(postObj);
        postsServices.createPosts(postObj)
    },
    deletePosts: (postId) => {
        console.log(`Delete post with id:${postId} in controller`);
        postsServices.deletePosts(postId)
    }
}

module.exports = postsController;