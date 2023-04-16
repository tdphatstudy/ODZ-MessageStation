const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.js');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.put('/forgetPassword', AuthController.forgetPassword);
router.put('/changePassword', AuthController.changePassword);
router.put('/comfirmGmail', AuthController.confirmGmail);

module.exports = router;