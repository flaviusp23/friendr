const postsServices = {
    createPosts: (postObj) => {
        console.log("Reached post services");
        console.log(postObj);
    },
    deletePosts: (postId) => {
        console.log(`Delete post with id:${postId} in services`);
    }
}

module.exports = postsServices;