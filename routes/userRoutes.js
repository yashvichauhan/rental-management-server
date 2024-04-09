const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', userController.registerNewUser);
router.post('/login', authController.login);

module.exports = router;