const express = require("express");
const router = express.Router();
const {
    paymentWebhook,
    getTransactions,
    exportCSV,
    downloadReceipt,
} = require("../controllers/transactionControllers");
router.post("/webhook", paymentWebhook);
router.get("/user/:userId", getTransactions);
router.get("/export/:userId", exportCSV);
router.get("/receipt/:transactionId", downloadReceipt);
module.exports = router;
