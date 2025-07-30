const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const MarketRate = require('../models/marketRate');

dotenv.config(); // Load MongoDB URI from .env

const data = JSON.parse(fs.readFileSync('market_rates.json', 'utf-8'));

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('📦 Connected to MongoDB');
    
    // Optional: Clear existing data before inserting
    await MarketRate.deleteMany();

    await MarketRate.insertMany(data);
    console.log('✅ Market rates inserted successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
