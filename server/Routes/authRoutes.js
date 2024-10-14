const express = require('express');

const authController = require('../Controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/getUser', authController.verify, authController.getUser);
router.get('/test', authController.verify, authController.test);
//router.get('/verify', authController.verify);

module.exports = router;