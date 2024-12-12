const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');

router.post('/start', insuranceController.startChat);
router.post('/message', insuranceController.sendMessage);

module.exports = router;
