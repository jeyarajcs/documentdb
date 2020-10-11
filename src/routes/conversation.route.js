const express = require('express');
const conversationController = require('../controllers/conversation.controller');

const router = express.Router();

router.post('/conversation', conversationController.createConversation);
router.get('/conversations', conversationController.getAllConversations);
router.get('/conversation/:id', conversationController.getConversationById);
router.put('/conversation/:id', conversationController.updateConversation);
router.delete('/conversation/:id', conversationController.deleteConversation);

module.exports = router;