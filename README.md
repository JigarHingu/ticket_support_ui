# 🎫 Ticket Support System - Full-Stack Application

![React](https://img.shields.io/badge/React-18-blue) ![MUI](https://img.shields.io/badge/MUI-5-purple) ![MongoDB](https://img.shields.io/badge/MongoDB-6-brightgreen) ![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-5-purple?logo=mui&logoColor=white) ![Express](https://img.shields.io/badge/Express-4-black?logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-6-brightgreen?logo=mongodb&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5-yellow?logo=vite&logoColor=white)



A complete, full-stack **ticket support system** built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Material-UI**.  
This application allows users to register, log in, create support tickets, reply to them, and manage their profile — all connected to a live backend and database.

---

## ✨ Features

### 🔐 User Authentication
- Secure user registration and login system using **JWT** (JSON Web Tokens).

### 🛡️ Protected Routes
- Main application pages are only accessible to **logged-in** users.

### 📝 Full CRUD for Tickets
- **Create**: Users can create new support tickets with a title, description, and category.
- **Read**: Users can view a list of all their tickets, separated into *Active* and *Completed* tabs, and view detailed conversations.
- **Update**: Users can update the status of a ticket (e.g., from *Open* to *Closed*).
- **Delete**: Users can permanently delete tickets.

### 💬 Ticket Reply System
- Full conversation thread for each ticket, enabling back-and-forth communication.

### 🆔 Dynamic User-Friendly IDs
- Generates short, readable IDs for tickets and users (e.g., `TKT-2025...`, `USR-0001`).

### 👤 Dynamic Profile Page
- Users can view and update their profile information, with changes saved permanently.

### 📚 Dynamic FAQ & Knowledge Base
- "Help Centre" and "Know Hub" pages fetch content dynamically from the backend.

### 🔍 Debounced Search
- Fast, efficient search on main ticket and guide pages.

### 📱 Responsive Design
- Works beautifully on both desktop and mobile devices.

### 🌍 Global State Management
- Uses **Redux Toolkit** for reliable global state handling.

---

## 🛠 Tech Stack

### **Frontend**
- **React.js** – UI library
- **Material-UI (MUI)** – UI components
- **React Router** – Client-side routing
- **Redux Toolkit** – State management
- **Vite** – Fast build tool

### **Backend**
- **Node.js** – Runtime
- **Express.js** – REST API framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication
- **bcrypt.js** – Password hashing
- **CORS** – Cross-origin requests
- **dotenv** – Environment variables

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### ✅ Prerequisites
- **Node.js** and **npm** installed
- **MongoDB Atlas** account and connection string

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd TICKET_SUPPORT_UI
``` 

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

### Create a `.env` file in the backend folder:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

### 3️⃣ Frontend Setup
```bash
cd ../vite-project
npm install
```

---

### ▶️ Running the Application

You will need two terminals open — one for backend and one for frontend.

### Start Backend Server
```bash
cd backend
npm start
```
- Runs on: `http://localhost:5000`

### Start Frontend Server
```bash
cd vite-project
npm run dev
```
- Opens at: `http://localhost:5173`

---

## 📸 Screenshots

![Homepage](./screenshots/home.png)
![Tickets Page](./screenshots/tickets.png)
![Profile Page](./screenshots/profile.png)

## 🌐 Live Demo
[Work in progress👩‍🏭](https://your-app-link.com)

![React](https://img.shields.io/badge/React-18-blue)
![MUI](https://img.shields.io/badge/MUI-5-purple)
![MongoDB](https://img.shields.io/badge/MongoDB-6-brightgreen)
![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5-purple?logo=mui&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-black?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6-brightgreen?logo=mongodb&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-yellow?logo=vite&logoColor=white)
