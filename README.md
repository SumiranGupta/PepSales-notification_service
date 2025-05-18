### ✅ GitHub Repo Structure
notification_service/
├── config/
│   └── db.js
├── controllers/
│   └── notificationController.js
├── models/
│   └── Notifications.js
├── routes/
│   └── notificationRoutes.js
├── .env.example
├── package.json
├── server.js
├── README.md


# 🛎️ Notification Service - PepSales Backend Assignment

This is a simple notification service built with Node.js, Express, and MongoDB. It supports creating and retrying failed notifications for different channels like email, SMS, and push.

---

## 🚀 Features
- Create a notification (`email`, `sms`, `push`)
- Randomized delivery simulation (70% success rate)
- Failed notifications are retried automatically every 30 seconds
- Retry limit (`maxRetries = 3`) to prevent endless attempts
- REST API with proper JSON responses
- MongoDB with Mongoose for persistence

---

## 📦 Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- Postman for API Testing

---

## 📂 Project Structure
notification_service/
├── models/ # Mongoose schema
├── controllers/ # Core business logic
├── routes/ # Express routes
├── config/ # MongoDB connection
├── server.js # App entry point





### Create a `.env` file and add:
MONGO_URI=mongodb://localhost:27017/notificationDB
PORT=5000



## 🛠️ Setup Instructions

git clone https://github.com/your-username/notification_service.git
cd notification_service

# Install dependencies
npm install

# Start server
npm run dev


### 🧪 API Testing (Use Postman)
➕ POST /notifications
Create a notification:
{
  "userId": "12345",
  "type": "email",
  "message": "This is a test notification"
}
### 📥 GET /users/:id/notifications
Get all notifications for a user.

### 🔁 Retry Mechanism
Every 30 seconds, the system checks for failed notifications and retries.
If it succeeds, it's marked as sent.
If it fails 3 times, it's left as failed.

Example:
{
  "status": "sent",
  "retryCount": 1,
  "maxRetries": 3
}
📸 Screenshots
### ![Screenshot 2025-05-18 205400](https://github.com/user-attachments/assets/c79d9c7c-1603-4c53-9972-24d1f2ffb26d)


💼 About Me
Hi, I'm a B.Tech student from KIIT University passionate about backend development along with MERN stack. This project was built as part of my submission for the PepSales Backend Internship.

## 📄 Sample Code Files
### `config/db.js`
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;


models/Notifications.js
const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, enum: ["email", "sms", "push"], required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    retryCount: { type: Number, default: 0 },
    maxRetries: { type: Number, default: 3 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);


controllers/notificationController.js
const Notification = require("../models/Notifications");

const sendToUser = async (notification) => {
  return Math.random() > 0.3; // 70% success rate
};

const sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;
  try {
    const newNotification = await Notification.create({ userId, type, message });
    const success = await sendToUser(newNotification);

   if (success) newNotification.status = "sent";
    else {
      newNotification.status = "failed";
      newNotification.retryCount += 1;
    }

   await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { sendNotification, getUserNotifications };



routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const {
  sendNotification,
  getUserNotifications,
} = require("../controllers/notificationController");

router.post("/notifications", sendNotification);
router.get("/users/:id/notifications", getUserNotifications);
module.exports = router;



server.js
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
  return Math.random() > 0.3;
};
const retryFailedNotifications = async () => {
  const failed = await Notification.find({ status: "failed", retryCount: { $lt: 3 } });
  for (const notif of failed) {
    const success = await sendToUser(notif);
    if (success) {
      notif.status = "sent";
    } else {
      notif.retryCount += 1;
    }
    await notif.save();
  }
};
setInterval(retryFailedNotifications, 30 * 1000);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
