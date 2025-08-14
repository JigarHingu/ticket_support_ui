Ticket Support System - Full-Stack Application
A complete, full-stack ticket support system built with the MERN stack (MongoDB, Express, React, Node.js) and Material-UI. This application allows users to register, log in, create support tickets, reply to them, and manage their profile, all connected to a live backend and database.

Features
User Authentication: Secure user registration and login system using JWT (JSON Web Tokens).

Protected Routes: Main application pages are only accessible to logged-in users.

Full CRUD for Tickets:

Create: Users can create new support tickets with a title, description, and category.

Read: Users can view a list of all their tickets, separated into "Active" and "Completed" tabs. They can also view the detailed conversation for each ticket.

Update: Users can update the status of a ticket (e.g., from "Open" to "Closed").

Delete: Users can permanently delete tickets.

Ticket Reply System: A full conversation thread for each ticket, allowing for back-and-forth communication.

Dynamic User-Friendly IDs: Generates short, readable IDs for tickets and users (e.g., TKT-2025..., USR-0001) for a better user experience.

Dynamic Profile Page: Users can view and update their profile information, with changes saved permanently to the database.

Dynamic FAQ & Knowledge Base: The "Help Centre" and "Know Hub" pages fetch their content dynamically from the backend.

Debounced Search: Fast and efficient search functionality on the main ticket and guide pages.

Responsive Design: The UI is fully responsive and works beautifully on both desktop and mobile devices.

Global State Management: Uses Redux Toolkit to manage the application's state, ensuring a consistent and reliable user experience.

Tech Stack
Frontend
React.js: A JavaScript library for building user interfaces.

Material-UI (MUI): A comprehensive React UI component library.

React Router: For handling client-side routing and navigation.

Redux Toolkit: For efficient and predictable global state management.

Vite: A modern, fast build tool for frontend development.

Backend
Node.js: A JavaScript runtime for building the server.

Express.js: A web application framework for Node.js, used to build the REST API.

MongoDB: A NoSQL database used to store all application data.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

JWT (JSON Web Tokens): For secure user authentication.

bcrypt.js: For hashing user passwords.

CORS: For enabling cross-origin requests between the frontend and backend.

dotenv: For managing environment variables.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js and npm installed on your machine.

A MongoDB Atlas account and a connection string.

Installation & Setup
Clone the repository:

git clone https://github.com/your-username/your-repo-name.git
cd TICKET_SUPPORT_UI

Set up the Backend:

Navigate to the backend directory:

cd backend

Install the NPM packages:

npm install

Create a .env file in the backend folder and add your environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000

Set up the Frontend:

Navigate to the frontend directory:

cd ../vite-project

Install the NPM packages:

npm install

Running the Application
You will need to have two terminals open to run both the frontend and backend servers simultaneously.

Start the Backend Server:

In your first terminal, navigate to the backend directory and run:

npm start

The server will start on http://localhost:5000.

Start the Frontend Server:

In your second terminal, navigate to the vite-project directory and run:

npm run dev

The application will open in your browser, usually at http://localhost:5173.