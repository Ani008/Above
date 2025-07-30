// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/Registration');

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const {
      organizationProfileName,
      primaryContactName,
      primaryContactRole,
      primaryContactPhone,
      primaryContactEmail,
      headquartersAddress,
      bankWebsiteUrl,
      regulatoryLicenseId,
      bankType,
      onboardDate,
      clientId,
      adminFullName,
      securityContact
    } = req.body;

    // Optional: Validation here

    const newUser = new User({
      organizationProfileName,
      primaryContactName,
      primaryContactRole,
      primaryContactPhone,
      primaryContactEmail,
      headquartersAddress,
      bankWebsiteUrl,
      regulatoryLicenseId,
      bankType,
      onboardDate,
      clientId,
      adminFullName,
      securityContact
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
