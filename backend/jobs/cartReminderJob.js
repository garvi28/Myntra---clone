const cron = require('node-cron');
const cart = require('../routes/cartRoutes');
const notification = require('../routes/notificationroutes');
const { sendPushNotification } = require('../services/expoService');
// every hour
cron.schedule('0 * * * *', async () => {
    console.log('Running cart reminder job');
// find cart with items
const carts = await cart.find({ items: { $exists: true, $not: { $size: 0 } } });
for (let c of carts) {
    const tokens = await notification.find({ 
        userId: c.userId 
    });
// send notification to user
    for (let t of tokens) {
    await sendPushNotification(
         t.token,
        'Cart Reminder',
        'items are missing in your'
    );
}