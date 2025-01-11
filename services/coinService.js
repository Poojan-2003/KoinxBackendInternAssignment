const axios = require('axios');

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchCryptoData() {
  try {
    const response = await axios.get(COINGECKO_URL, {
      params: {
        vs_currency: 'usd',
        ids: COINS.join(','),
      },
    });
    return response.data.map((coin) => ({
      coin: coin.id,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
    }));
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error.message);
    return [];
  }
}

module.exports = { fetchCryptoData };
