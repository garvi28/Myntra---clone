const mongoose = require('mongoose');

const cartitemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    priceAtAdd: { type: Number, required: true }, 
});
const cartSchema  = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activeitems: [cartitemSchema],
    savedforlater: [cartitemSchema],

    version: { type: Number, default: 0 },// For optimistic concurrency control 

    }, 
    module.exports = mongoose.model('Cart', cartSchema);
    