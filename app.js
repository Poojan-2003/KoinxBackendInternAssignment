const express = require('express');
const { connectToDatabase } = require('./config/database');
const apiRoutes = require('./routes/api');
require('./jobs/cronJob'); // Import the background job
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      const environment = process.env.VERCEL ? 'Vercel' : 'local';
      console.log(`Server running in ${environment} environment on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });
module.exports = app;
