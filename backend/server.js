require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const registrationRoutes = require('./routes/registrationRoutes');
const moneyMarketRoutes = require('./routes/moneyMarketRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📡 Visit: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Exit process if DB connection fails
    });

// ===== Base Route =====
app.get('/', (req, res) => {
    res.send('✅ Bank Registration & Money Market Backend API is running!');
});

// ===== Mount Routes =====
app.use('/api/registration', registrationRoutes);     // Routes like POST /api/registration/...
app.use('/api/borrowing', moneyMarketRoutes);         // Routes like POST /api/borrowing/borrowing-requests, GET /api/borrowing/borrowing-requests
