const mongoose = require("mongoose");

const recentlyViewedSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            viewedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    version: { 
        type: Number, 
        default: 0 
    }, // For optimistic concurrency control across devices
    lastSyncedAt: {
        type: Date,
        default: Date.now
    }, // Track when last synced across devices
}, { timestamps: true });

// Index for faster queries
recentlyViewedSchema.index({ userId: 1 });

module.exports = mongoose.model("RecentlyViewed", recentlyViewedSchema);


          
 
   


     