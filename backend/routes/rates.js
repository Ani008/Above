// backend/routes/rates.js
const express = require('express');
const router = express.Router();
const { getRates } = require('../controllers/ratesController');

router.get('/', getRates);

module.exports = router;
