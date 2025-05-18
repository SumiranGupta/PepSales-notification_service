# 🛎️ Notification Service - PepSales Backend Assignment

This is a simple notification service built with Node.js, Express, and MongoDB. It supports creating and retrying failed notifications for different channels like email, SMS, and push.

---

## 🚀 Features
- Create a notification (`email`, `sms`, `push`)
- Randomized delivery simulation
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


```bash
# Clone the repo
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
## 📸 Screenshots
![Screenshot 2025-05-18 204909](https://github.com/user-attachments/assets/ef1d37f7-5b38-432c-b272-4b9968f3710c)


![Screenshot 2025-05-18 204808](https://github.com/user-attachments/assets/059878a7-18f5-44a7-a9e3-dca71975a317)


![Screenshot 2025-05-18 204950](https://github.com/user-attachments/assets/4e2f5b07-5d64-4bfc-ab93-9a93a9943821)


![Screenshot 2025-05-18 205030](https://github.com/user-attachments/assets/95312f10-f414-44cc-bec8-714878da1f0a)


![Screenshot 2025-05-18 205400](https://github.com/user-attachments/assets/d621748b-d414-4363-bcf4-1b2fc51297b7)


![Screenshot 2025-05-18 205542](https://github.com/user-attachments/assets/694f2f66-5eae-4c32-9ae4-e3b4837c60e4)



## 💼 About Me
Hi, I'm a B.Tech student from KIIT University passionate about backend development along with MERN stack. This project was built as part of my submission for the PepSales Backend Internship.

## 📄 Sample Code Files
