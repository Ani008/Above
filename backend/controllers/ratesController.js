// backend/controllers/ratesController.js
const fs = require('fs');
const path = require('path');

const getRates = (req, res) => {
  const filePath = path.join(__dirname, '../market_rates.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    try {
      const rates = JSON.parse(data);
      res.json(rates);
    } catch (parseErr) {
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
};

module.exports = { getRates };
