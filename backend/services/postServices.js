const postModel = require("../data/post.model");
const { v4:uuidv4 } = require('uuid');
const postsServices = {
    getPosts: async(postId) => {
        console.log("Reached GET post services");
        console.log(postId)
        const response = await postModel.findOne({id:postId},{})
        return response
    },
    createPosts: (postObj) => {
        console.log("Reached POST post services");
        console.log(postObj);
        postObj.id = uuidv4();
        postObj.date = new Date().toISOString()
        const postToBeCreated = new postModel(postObj);
        postToBeCreated.save().then(() => console.log("Post created"))
    },
    getAllPosts: async () =>{
        console.log("Reached GET ALL post services")
        const response = await postModel.find()
        return response
    },
    deletePosts: async (postId) => {
        console.log("Reached DELETE post services");
        console.log(postId)
        const response = await postModel.deleteOne({id:postId})
        return response
    },
    removePostLikes: async(postId,username) => {
        await postModel.updateOne({id:postId},{$pull:{likes:username}});
    },
    addPostLikes: async(postId,username) => {
        await postModel.updateOne({id:postId},{$push:{likes:username}});
    },
}

module.exports = postsServices;