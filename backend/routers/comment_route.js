const express = require('express')
const commentsController = require('../controllers/commentsController')
const authenticateToken = require('../middleware/auth')
const router = express.Router()

router.get('/:id',authenticateToken,commentsController.getComment)
router.get('/',authenticateToken,commentsController.getAllComments)
router.post('/',authenticateToken,commentsController.createComment)
router.patch('/:id',authenticateToken,commentsController.updateComment)
router.delete('/:id',authenticateToken,commentsController.deleteOneComment)
router.delete('/',authenticateToken,commentsController.deleteAllCommentsByPostId)

module.exports = router