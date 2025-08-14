const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const faqRoutes = require('./routes/faqRoutes');
const guideRoutes = require('./routes/guideRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="text-align:center; padding-top:50px;">
        <h1>API WORKING ✅</h1>
        <img src="./logo.png" alt="API Image" width="1500" />
      </body>
    </html>
  `);
});

app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/guides', guideRoutes);

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
