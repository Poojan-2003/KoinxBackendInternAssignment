const express = require('express');
const { connectToDatabase } = require('./config/database');
const apiRoutes = require('./routes/api');
require('./jobs/cronJob'); // Import the background job
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

app.get("/",(req,res)=>{
  console.log("Home route");
});
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });
module.exports = app;
