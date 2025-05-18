const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/notificationRoutes");
const Notification = require("./models/Notifications");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/", notificationRoutes);

const sendToUser = async (notification) => {
  const success = Math.random() > 0.3;
  return success;
};

const retryFailedNotifications = async () => {
  const failed = await Notification.find({
    status: "failed",
    retryCount: { $lt: 3 },
  });

  for (const notif of failed) {
    const success = await sendToUser(notif);

    if (success) {
      notif.status = "sent";
    } else {
      notif.retryCount += 1;
      if (notif.retryCount >= notif.maxRetries) {
        notif.status = "failed";
      }
    }

    await notif.save();
  }
};

setInterval(retryFailedNotifications, 30 * 1000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
