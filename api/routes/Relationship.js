const express = require('express');
const router = express.Router();
const Relationship = require('../controllers/Relationship.js');

router.get('/all/user/:id', Relationship.getAllByUser);
router.get('/sending/user/:id', Relationship.getSendingByUser);
router.get('/pending/user/:id', Relationship.getPendingByUser);
router.get('/friend/user/:id', Relationship.getFriendByUser);
router.post('/create', Relationship.create);
router.post('/accepted', Relationship.accepted);
router.post('/reject', Relationship.reject);

module.exports = router;