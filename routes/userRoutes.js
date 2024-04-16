const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/signup', userController.registerNewUser);
router.post('/login', authController.login);
router.post('/update-password', authenticateToken, userController.updatePassword);

router.get('/user', authenticateToken, userController.getCurrentUser);

module.exports = router;