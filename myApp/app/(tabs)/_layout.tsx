import { Stack } from "expo-router";
import { useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function RootLayout() {

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  async function registerForPushNotifications() {

    if (!Device.isDevice) return;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {

      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") return;

    const tokenData =
      await Notifications.getExpoPushTokenAsync();

    const token = tokenData.data;

    console.log("Expo Token:", token);

    // Send token to backend
    await fetch("http://192.168.1.68:5000/notifications/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId: "USER_ID_HERE",
        token,
      }),
    });
  }

 return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}
