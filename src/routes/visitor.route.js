const express = require('express');
const visitorController = require('../controllers/visitor.controller');

const router = express.Router();

router.post('/visitor', visitorController.createVisitor);

module.exports = router;