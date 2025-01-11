
# Crypto Stats API

This project provides an API service to fetch and analyze cryptocurrency data using **CoinGecko**'s API. It includes background jobs to periodically update cryptocurrency information in the database and exposes endpoints for querying real-time data and statistical calculations.
Some screenshot of working of application.
![image](https://github.com/user-attachments/assets/37b2e381-55a7-4a9a-969d-b95602153340)
![image](https://github.com/user-attachments/assets/bb1def1c-94b2-4fdb-8995-af9563c8670e)
![image](https://github.com/user-attachments/assets/35b5455e-a88b-432b-8a1b-16b159015cb6)

## Features

1. **Background Job**:
   - Fetches the current price, market cap, and 24-hour change for three cryptocurrencies: Bitcoin, Ethereum, and Matic.
   - Data is fetched every 2 hours and stored in a MongoDB database.

2. **API Endpoints**:
   - **`GET /api/stats`**: Retrieves the latest data for a requested cryptocurrency.
   - **`GET /api/deviation`**: Calculates the standard deviation of the cryptocurrency's price based on the last 100 records in the database.

3. **Deployment**:
   - The application is deployed on **Vercel**.
   - Environment variables like MongoDB connection URI are securely managed.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Scheduler**: node-cron
- **API Integration**: CoinGecko API
- **Deployment**: Vercel
- **Environment Management**: dotenv

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd crypto-stats-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the following variables:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/crypto?retryWrites=true&w=majority
   PORT=3000
   ```

4. Start the server locally:
   ```bash
   npm start
   ```

---

## API Endpoints

### **`GET /api/stats`**
Fetch the latest cryptocurrency data.

#### Query Parameters:
| Parameter | Type   | Description                                    |
|-----------|--------|------------------------------------------------|
| `coin`    | string | Cryptocurrency ID (bitcoin, ethereum, matic) |

#### Sample Request:
```http
GET /api/stats?coin=bitcoin
```

#### Sample Response:
```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### **`GET /api/deviation`**
Calculate the standard deviation of the price for the last 100 records of a cryptocurrency.

#### Query Parameters:
| Parameter | Type   | Description                                    |
|-----------|--------|------------------------------------------------|
| `coin`    | string | Cryptocurrency ID (bitcoin, ethereum, matic) |

#### Sample Request:
```http
GET /api/deviation?coin=bitcoin
```

#### Sample Response:
```json
{
  "deviation": 4082.48
}
```

---

## Database Schema

### **Collection: CryptoData**
| Field          | Type      | Description                                   |
|----------------|-----------|-----------------------------------------------|
| `coin`         | string    | Cryptocurrency ID (e.g., bitcoin, ethereum)  |
| `price`        | number    | Current price in USD                         |
| `marketCap`    | number    | Current market capitalization in USD         |
| `24hChange`    | number    | Percentage change in the last 24 hours       |
| `timestamp`    | Date      | Timestamp of when the data was fetched       |

---

## Project Structure

```
crypto-stats-api/
├── src/
│   ├── app.js            # Main entry point
│   ├── config/
│   │   └── database.js   # MongoDB connection setup
│   ├── jobs/
│   │   └── cronJob.js    # Background job setup with node-cron
│   ├── models/
│   │   └── CryptoData.js # Mongoose schema for cryptocurrency data
│   ├── routes/
│   │   └── api.js        # API route handlers
│   └── services/
│       └── coinService.js # Service to fetch data from CoinGecko
├── .env                   # Environment variables (not committed)
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## Deployment

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Set up environment variables on Vercel:
   - Go to your project settings on the Vercel dashboard.
   - Add the `MONGO_URI` variable with your MongoDB connection string.

---

## Logs

All incoming requests and background job execution details are logged to the console, making them visible in the server logs when deployed on Vercel.

---

## Improvements and Best Practices

- **Error Handling**: Comprehensive error handling for API failures and database operations.
- **Environment Management**: Secure management of sensitive information using `.env` and Vercel environment variables.
- **Scalability**: Modular structure for easy addition of new features.
- **Testing**: Adding unit and integration tests to ensure reliability.

---

## Future Enhancements

1. Add more cryptocurrencies to track.
2. Include historical data visualization in the API.
3. Implement user authentication for restricted access.
4. Add caching for frequently requested data to improve performance.

