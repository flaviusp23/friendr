const postModel = require("../data/post.model");

const postsServices = {
    getPosts: async(postId) => {
        console.log("Reached GET post services");
        console.log(postId)
        const response = await postModel.findOne({id:postId},{})
        return response
    },
    createPosts: (postObj) => {
        console.log("Reached POST post services");
        console.log(postObj)
        const userToBeCreated = new postModel(postObj);
        userToBeCreated.save().then(() => console.log("Post created"))
    },
    deletePosts: async (postId) => {
        console.log("Reached DELETE post services");
        console.log(postId)
        const response = await postModel.deleteOne({id:postId})
        return response
    }
}

module.exports = postsServices;