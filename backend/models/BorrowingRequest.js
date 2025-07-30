// models/BorrowingRequest.js
const mongoose = require('mongoose');

const borrowingRequestSchema = new mongoose.Schema({
  instrumentType: {
    type: String,
    required: true,
    enum: ['Call Money', 'Notice Money', 'Term Money', 'Repo', 'Reverse Repo', 'CD', 'CP'] // Enforce valid options
  },
  dealAmount: {
    type: Number,
    required: true,
    min: 0 // Ensure non-negative amount
  },
  tenure: {
    type: Number,
    required: true,
    min: 1 // Ensure positive tenure
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0 // Ensure non-negative rate
  },
  interestRateType: {
    type: String,
    required: true,
    enum: ['Fixed', 'Floating']
  },
  negotiable: {
    type: Boolean,
    default: false
  },
  collateralType: {
    type: String,
    required: true,
    enum: ['G-Sec', 'T-Bill', 'Corporate Bond', 'FD', 'No Collateral']
  },
  collateralDescription: String,
  preClosureAllowed: {
    type: Boolean,
    default: false
  },
  comments: String,

  contactPerson: { type: String, required: true },
  designation: { type: String, required: true },
  contactEmail: { type: String, required: true },


  submissionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BorrowingRequest', borrowingRequestSchema);