# E-Waste Management System

## 📌 Project Overview
This project is an **E-Waste Management System** that connects users with recyclers to dispose of electronic waste responsibly. The platform allows users to submit e-waste requests, select recyclers, and track pickup status.

## 🚀 Tech Stack
### **Frontend**
- React.js (with Vite)
- Bootstrap
- Material UI (MUI)

### **Backend**
- Node.js
- Express.js
- MongoDB (with Mongoose)

## 📂 Project Structure
```
📁 e-waste-management
├── 📁 client  (Frontend React App)
│   ├── 📂 src
│   │   ├── 📂 components
│   │   ├── 📂 pages
│   │   ├── 📜 App.jsx
│   │   ├── 📜 index.js
│   ├── 📜 package.json
│   ├── 📜 vite.config.js
│
├── 📁 server  (Backend API)
│   ├── 📂 routes
│   ├── 📂 models
│   ├── 📂 controllers
│   ├── 📜 server.js
│   ├── 📜 package.json
```

## 🛠️ Setup Instructions
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_GITHUB/e-waste-management.git
cd e-waste-management
```

### **2️⃣ Install Dependencies**
#### Frontend:
```sh
cd frontend
npm install
```
#### Backend:
```sh
cd backend
npm install
```

### **3️⃣ Environment Variables**
Create a **.env** file in the `server/` directory and add the following:
```
Ask me for .env file, without this website is not going to start
```

### **4️⃣ Run the Project**
#### Start Backend Server:
```sh
npm run dev
```
#### Start Frontend:
```sh
npm run dev
```

## 🛠️ API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /api/requests | Submit an e-waste request |
| GET  | /api/recyclers | Get the list of recyclers |
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |

## ✅ Contributing Guidelines
- Follow **Git best practices** (use feature branches, write meaningful commits).
- Run tests before pushing code.
- Discuss major changes in **team meetings**.


---
👥 **Team Members:**
- **Atharva Sachin Joshi** (Full Stack Developer)
- [Add other teammates here]

