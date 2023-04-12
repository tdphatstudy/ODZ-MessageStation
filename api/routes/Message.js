const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/Message.js');

router.get('/group/:groupId', MessageController.getByGroupChat);
router.post('/create', MessageController.create);
router.put('/readStatus', MessageController.changeReadStatus);
router.put('/visibleStatus', MessageController.changeVisible);


module.exports = router;