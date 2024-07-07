const express = require('express')
const commentsController = require('../controllers/commentsController')
const router = express.Router()

router.get('/:id',commentsController.getComment)
router.get('/',commentsController.getAllComments)
router.post('/',commentsController.createComment)
router.patch('/:id',commentsController.updateComment)
router.delete('/:id',commentsController.deleteOneComment)
router.delete('/',commentsController.deleteAllCommentsByPostId)

module.exports = router