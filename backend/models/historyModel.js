const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    viewedAt: { type: Date, default: Date.now },
});
 // Index to quickly find recently viewed products for a user
historySchema.index({ userId: 1, viewedAt: -1 });
historySchema.index({ viewedAt: -1 },{ expireAfterSeconds: 60 * 60 * 24 * 30 });

module.exports = mongoose.model('History', historySchema);
