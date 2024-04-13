const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController');

router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);
router.get('/user', userController.getCurrentUser);

module.exports = router;
