const mongoose = require('mongoose');

const MarketRateSchema = new mongoose.Schema({
  rate_name: {
    type: String,
    required: true,
  },
  rate_value: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('MarketRate', MarketRateSchema);
