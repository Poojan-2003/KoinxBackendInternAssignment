const express = require('express');
const { connectToDatabase } = require('./config/database');
const CryptoData = require('./models/CryptoData');
const { calculateStandardDeviation } = require('./utils/mathUtils');
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

// API Route for /stats
app.get('/api/stats', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Missing 'coin' query parameter" });
  }

  try {
    const record = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
    if (!record) {
      return res.status(404).json({ error: 'Data not found for the requested coin' });
    }

    res.json({
      price: record.price,
      marketCap: record.marketCap,
      change24h: record.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' });
  }
});

// API Route for /deviation
app.get('/api/deviation', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Missing 'coin' query parameter" });
  }

  try {
    const records = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (records.length < 2) {
      return res.status(400).json({ error: 'Not enough data to calculate deviation' });
    }

    const prices = records.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' });
  }
});

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });

module.exports = app;
