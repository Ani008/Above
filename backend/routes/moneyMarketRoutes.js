const express = require('express');
const router = express.Router();
const BorrowingRequest = require('../models/BorrowingRequest');

// POST route to submit a borrowing request
router.post('/borrowing-requests', async (req, res) => {
  try {
    const {
      instrumentType,
      dealAmount,
      tenure,
      interestRate,
      interestRateType,
      negotiable,
      collateralType,
      collateralDescription,
      preClosureAllowed,
      comments,
      contactPerson,
      designation,
      contactEmail
    } = req.body;

    const newRequest = new BorrowingRequest({
      instrumentType,
      dealAmount: parseFloat(dealAmount),
      tenure: parseInt(tenure, 10),
      interestRate: parseFloat(interestRate),
      interestRateType,
      negotiable,
      collateralType,
      collateralDescription,
      preClosureAllowed,
      comments,
      contactPerson,
      designation,
      contactEmail
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ message: 'Borrowing request submitted successfully!', data: savedRequest });
  } catch (error) {
    console.error('Error saving borrowing request:', error);
    res.status(400).json({ message: 'Failed to submit borrowing request', error: error.message });
  }
});

// ✅ GET route to fetch all borrowing requests
router.get('/borrowing-requests', async (req, res) => {
  try {
    const deals = await BorrowingRequest.find().sort({ submissionDate: -1 }); // sort latest first
    res.status(200).json(deals);
  } catch (error) {
    console.error('Error fetching borrowing requests:', error);
    res.status(500).json({ message: 'Failed to fetch borrowing requests', error: error.message });
  }
});

module.exports = router;
