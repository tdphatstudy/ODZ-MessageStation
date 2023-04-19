const express = require('express');
const router = express.Router();
const uploadFile = require('../controllers/Upload.js');

router.post('/file', uploadFile);

module.exports = router;