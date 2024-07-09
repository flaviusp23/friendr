const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController');
const authenticateToken = require('../middleware/auth');
// Routes
router.post('/register', usersController.createUsers); // Public route
router.post('/login', usersController.login); // Public route
router.get('/:username', usersController.getUsers); // Protected route

router.get('/:username/search',usersController.searchUsers)
router.delete('/', authenticateToken, usersController.deleteUsers); // Protected route
router.patch('/:username/follow', authenticateToken, usersController.followUsers); // Protected route

module.exports = router;