const express = require('express');
const visitorRoute = require('./visitor.route');
const userRoute = require('./user.route');
const conversationRoute = require('./conversation.route');
const { verifyClient } = require('../middlewares/clientVerification');

const router = express.Router();

router.use('/visitors', verifyClient,  visitorRoute);
router.use('/users', verifyClient, userRoute);
router.use('/conversations', verifyClient, conversationRoute);

module.exports = router;