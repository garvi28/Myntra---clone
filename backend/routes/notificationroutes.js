const express = require('express');
const router = express.Router();

const {
    registerToken,
    sendOrderNotification
} = require('../controllers/notificationControllers');
router.post('/register', registerToken);
router.post('/send', sendOrderNotification);
module.exports = router;
