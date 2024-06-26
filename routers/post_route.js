const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router()

let posts = [
    {id: 1, title: "First Post", content: "This is the first post."},
    {id: 2, title: "Second Post", content: "This is the second post."}
]

router.get('/', (req,res) =>{
    console.log(req.query.id);
    const postId = req.query.id;
    let found = false;
    for(let i = 0 ; i < posts.length; i++)
    {
        if(posts[i].id == postId){
            res.send(posts[i]);
            found = true;
            return
        }
    }
    if(!found){
        res.status(404).send();
    }
})
router.post('/',(req,res) =>{
    console.log(req.body)
    postsController.createPosts(req.body);
    res.status(201);
    res.send("The post will be created");
})
router.delete('/:id',(req,res) =>{
    const userId = req.params.id
    postsController.deletePosts(userId);
    res.status(201);
    res.send("The post have been deleted")
})
module.exports = router;