const express = require('express');
const router = express.Router()
const postsController = require('../controllers/postsController');
const authenticateToken = require('../middleware/auth');

router.get('/:id',authenticateToken,postsController.getPosts)
router.get('/',authenticateToken,postsController.getAllPosts)
router.get('/author/:username',authenticateToken, postsController.getPostsByAuthor);
router.post('/',authenticateToken,postsController.createPosts)
router.delete('/',authenticateToken,postsController.deletePosts)
router.patch('/:id/likes',authenticateToken,postsController.updatePostLikes)
router.patch('/:id',authenticateToken,postsController.updatePost)

module.exports = router;