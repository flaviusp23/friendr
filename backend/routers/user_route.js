const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController');

router.post('/register',usersController.createUsers)
router.post('/login', usersController.login);
router.get('/:username',usersController.getUsers)
router.delete('/',usersController.deleteUsers)
router.patch('/:username/follow',usersController.followUsers)

module.exports = router;