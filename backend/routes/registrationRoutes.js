const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration'); // Import your Registration model here

// The content that was previously in app.post('/api/register') in server.js
router.post('/register', async (req, res) => { // Notice it's just '/register' now, as '/api' is added in server.js
    try {
        const newRegistration = new Registration(req.body);
        await newRegistration.save();
        res.status(201).json({
            message: 'Registration successful!',
            registration: newRegistration
        });
    } catch (error) {
        console.error('Error saving registration:', error);
        if (error.name === 'ValidationError') {
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors
            });
        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const value = error.keyValue[field];
            return res.status(409).json({
                message: `Duplicate entry for ${field}: '${value}'. This ${field} already exists.`,
                field: field
            });
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;