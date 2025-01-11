const express = require('express');
const CryptoData = require('../models/CryptoData');
const { calculateStandardDeviation } = require('../utils/mathUtils');

const router = express.Router();

// Get latest data for a coin
router.get('/stats', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Missing 'coin' query parameter" });
  }

  const record = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
  if (!record) {
    return res.status(404).json({ error: 'Data not found for the requested coin' });
  }

  res.json({
    price: record.price,
    marketCap: record.marketCap,
    change24h: record.change24h,
  });
});

// Get standard deviation of price for the last 100 records
router.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Missing 'coin' query parameter" });
  }

  const records = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
  if (records.length < 2) {
    return res.status(400).json({ error: 'Not enough data to calculate deviation' });
  }

  const prices = records.map((record) => record.price);
  const deviation = calculateStandardDeviation(prices);

  res.json({ deviation: parseFloat(deviation.toFixed(2)) });
});

module.exports = router;
