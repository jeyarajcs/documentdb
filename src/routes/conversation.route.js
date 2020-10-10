const express = require('express');
const conversationController = require('../controllers/conversation.controller');
const {verifyToken} = require('../middlewares/tokenVerification');

const router = express.Router();

router.post('/conversation', conversationController.createConversation);
router.get('/conversations', conversationController.getConversations);

module.exports = router;