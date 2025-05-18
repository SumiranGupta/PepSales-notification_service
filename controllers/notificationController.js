const Notification = require("../models/Notifications");

const sendToUser = async (notification) => {
  const success = Math.random() > 0.3;
  return success;
};

const sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;

  if (!userId || !type || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newNotification = await Notification.create({
      userId,
      type,
      message,
      status: "pending",
      retryCount: 0,
    });

    const success = await sendToUser(newNotification);

    if (success) {
      newNotification.status = "sent";
    } else {
      newNotification.status = "failed";
      newNotification.retryCount = 1;
    }

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserNotifications = async (req, res) => {
  const { id } = req.params;

  try {
    const notifications = await Notification.find({ userId: id });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  sendNotification,
  getUserNotifications,
};
