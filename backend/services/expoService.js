const {expo} = require('expo-server-sdk');
const expo = new Expo();
exports.sendPushNotification = async (token, title, body) => {
try {
    if (!Expo.isExpoPushToken(token)) {
        throw new Error(`Invalid Expo push token: ${token}`);
    }
    const messages = {
        to: token,
        sound: 'default',
        title,
        body,
    }
];
    const chunks = expo.chunkPushNotifications([messages]);
    for (let chunk of chunks) {
    const receipts = await expo.sendPushNotificationsAsync(chunk);

    console.log(receipts);
    // remove invalid tokens from database
    receipts.forEach((receipt, index) => {
        if (receipt.status === 'error') {
        console.error(Removing invalid token);
       const NotificationToken = require('../models/notificationTokenModel');
       await NotificationToken.deleteOne({ token: chunk[index].to });
        }
    });
    }
} catch (error) {
    console.error('Error sending push notification:', error);
}
};
