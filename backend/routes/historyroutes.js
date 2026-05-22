const express = require('express');
const router = express.Router();
const {addtoHistory} = require('../controllers/historyControllers');

router.post('/add', addtoHistory);

module.exports = router;