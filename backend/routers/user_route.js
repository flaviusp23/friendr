const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController');

router.post('/',usersController.createUsers)
router.get('/:username',usersController.getUsers)
router.delete('/',usersController.deleteUsers)

module.exports = router;