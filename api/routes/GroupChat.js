const express = require('express');
const router = express.Router();
const GroupChatController = require('../controllers/GroupChat.js');

router.post('/create/relationshipGroup', GroupChatController.createRelationshipGroup);
router.post('/create/publicGroup', GroupChatController.createPublicGroup);
router.put('/menber/add', GroupChatController.addMember);
router.put('/admin/add', GroupChatController.addAdmin);

module.exports = router;