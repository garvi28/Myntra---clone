const RecentlyViewed = require('../models/recentlyviewedmodel');

// Add a product to the recently viewed list
exports.addRecentlyViewed = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let record = await RecentlyViewed.findOne({ userId });
        if (!record) {
            record = new RecentlyViewed({
                userId,
                products: [{ productId }],
            });
        } else {
            // Ensure products is always an array
            record.products = Array.isArray(record.products) ? record.products : [];
            // Remove duplicate
            record.products = record.products.filter(
                (item) => item.productId.toString() !== productId
            );
            // Add to the beginning
            record.products.unshift({ productId });

            if (record.products.length > 20) {
                record.products = record.products.slice(0, 20);
            }
        }

        await record.save();
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.mergeRecentlyViewed = async (req, res) => {
    try {
        const { userId, guestProducts } = req.body;

        let record = await RecentlyViewed.findOne({ userId });
        if (!record) {
            record = new RecentlyViewed({
                userId,
                products: guestProducts || [],
            });
        } else {
            record.products = Array.isArray(record.products) ? record.products : [];
            const productIds = new Set(record.products.map(p => p.productId.toString()));
            
            for (const product of guestProducts) {
                if (!productIds.has(product.productId.toString())) {
                    record.products.unshift(product);
                    productIds.add(product.productId.toString());
                }
            }

            if (record.products.length > 20) {
                record.products = record.products.slice(0, 20);
            }
        }

        await record.save();
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecentlyViewed = async (req, res) => {
    try {
        const { userId } = req.params;
        const record = await RecentlyViewed.findOne({ userId });
        
        if (!record) {
            return res.status(200).json({ products: [] });
        }

        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
