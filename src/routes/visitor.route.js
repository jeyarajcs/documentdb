const express = require('express');
const visitorController = require('../controllers/visitor.controller');

const router = express.Router();

router.post('/visitor', visitorController.createVisitor);
router.get('/visitors', visitorController.getAllVisitors);
router.get('/visitor/:id', visitorController.getVisitorById);
router.put('/visitor/:id', visitorController.updateVisitor);
router.delete('/visitor/:id', visitorController.deleteVisitor);
router.get('/company-count', visitorController.getCompanyWiseCount);

module.exports = router;