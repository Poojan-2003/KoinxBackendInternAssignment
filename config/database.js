const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

async function connectToDatabase() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
