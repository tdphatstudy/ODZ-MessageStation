const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.js');

router.post('/login', AuthController.login);
router.post('/resgister', AuthController.register);
router.put('/forgetPassword', AuthController.forgetPassword);
router.put('/changePassword', AuthController.changePassword);

module.exports = router;