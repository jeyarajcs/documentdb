const express = require('express');
const visitorRoute = require('./visitor.route');
const userRoute = require('./user.route');
const conversationRoute = require('./conversation.route');

const router = express.Router();

router.use('/visitors', visitorRoute);
router.use('/users', userRoute);
router.use('/conversations', conversationRoute);

module.exports = router;