const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: String,
    status: String,
    item: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        size: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    shippingAddress: mongoose.Schema.Types.Mixed,
    paymentMethod: String,
    tracking: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
