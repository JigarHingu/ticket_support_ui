const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const faqRoutes = require('./routes/faqRoutes');
const guideRoutes = require('./routes/guideRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

app.disable('x-powered-by');

// --- CORS Configuration ---

// List of allowed origins (your frontend domains)
const allowedOrigins = [
  'https://www.your-production-app.com', // Your live frontend URL
  'http://localhost:5173'                 // Your local development URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the request's origin is in our whitelist or if it's not a browser request (e.g., Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Optional: If you need to allow cookies to be sent
};

const PORT = process.env.PORT || 5000;

// Use the configured CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="text-align:center; padding-top:50px;">
        <h1>API WORKING ✅</h1>
        <img src="./logo.png" alt="API Image" width="1000" />
      </body>
    </html>
  `);
});

app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/articles', articleRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}` );
      console.log(`connected to MongoDB`)
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
