const cron = require('node-cron');
const CryptoData = require('../models/CryptoData');
const { fetchCryptoData } = require('../services/coinService');

// Function to fetch and save cryptocurrency data
async function fetchAndSaveCryptoData() {
  console.log('Fetching cryptocurrency data...');
  const data = await fetchCryptoData();

  if (data.length > 0) {
    await CryptoData.insertMany(data);
    console.log('Data saved to database');
  } else {
    console.log('No data fetched');
  }
}

// Run once on server startup
(async () => {
  console.log('Running job immediately on server startup...');
  await fetchAndSaveCryptoData();
})();

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running scheduled job every 2 hours...');
  await fetchAndSaveCryptoData();
});
