const express = require('express');
const router = express.Router()
const postsController = require('../controllers/postsController');

router.get('/:id',postsController.getPosts)
router.get('/',postsController.getAllPosts)
router.post('/',postsController.createPosts)
router.delete('/',postsController.deletePosts)
router.patch('/:id/likes',postsController.updatePostLikes)

module.exports = router;