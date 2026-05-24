const Cart = require('../models/cartModel');
const Product = require('../models/product');


exports. addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const product = await Product. findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if ( product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        let cart = await Cart.findOne
        if (!cart) {
            cart = new Cart({ userId, activeitems: [] }); 
        }

        const existingItem = cart.activeitems.find(
            (item) => item.productId.toString() === productId
        );
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.activeitems.push({
                productId,
                quantity,
                priceAtAdd: product.price,
            });
        }
        cart.version += 1;
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.saveforlater = async (req, res) => {
    const { userId, productId, quantity } = req.body;
 let cart = await Cart.findOne({ userId });
 const item = cart.activeitems.find(
    (i) => i.productId.toString() === productId
 );

 if (!item) return res.status(404).json({ message: 'Item not found in cart' });
    // Remove from actives
    cart.activeitems = cart.activeitems.filter(
        (i) => i.productId.toString() !== productId 
    );
    // Add to saved
    cart.savedforlater.push(item);
    cart.version += 1;
    await cart.save();
    res.json(cart);
};

exports.moveToCart = async (req, res) => {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({
        userId,
    });
    const item = cart.savedforlater.find(
        (i) => i.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ message: 'Item not found in saved list' });

    cart.savedforlater = cart.savedforlater.filter(
        (i) => i.productId.toString() !== productId
    );
    cart.activeitems.push(item);
    cart .version += 1;
    await cart.save();
    res.json(cart);
};

exports.checkout = async (req, res) => {
const { userId } = req.body;
const cart = await Cart.findOne({ userId }).populate('activeitems.productId');

for(let item of cart.activeitems)
{
    if(item.productId.stock < item.quantity){
        return res.status(400).json({
        message: "Product Discontinued"
       });
    }

    if (products.stock < item.quantity) {
        return res.status(400).json({
        message: ` Stock issue for product ${item.productId.name}`,
      });
    }
    res.json({ message: 'Checkout successful' });
};

