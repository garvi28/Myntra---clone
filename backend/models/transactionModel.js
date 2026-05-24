const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
            paymentId : {
                type: String,
            },
            paymentMode: String,
            
            amount: Number,
            
            status: {
                type: String,
                enum: ["pending", "completed", "failed"],
            },
            invoiceid: {
                type: String,
                unique: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
module.exports = mongoose.model("Transaction", transactionSchema);
