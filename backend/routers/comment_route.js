const express = require('express')
const commentsController = require('../controllers/commentsController')
const router = express.Router()

router.get('/:id',commentsController.getComment)
router.post('/',commentsController.createComment)
router.get('/',commentsController.getAllComments)
router.delete('/:id',commentsController.deleteOneComment)
router.delete('/',commentsController.deleteAllCommentsByPostId)

module.exports = router