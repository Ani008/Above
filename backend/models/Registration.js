const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    // Step 1: Core Identity
    organizationProfileName: {
        type: String,
        required: [true, 'Organization name is required'],
        trim: true,
        unique: true // Assuming organization names should be unique
    },
    // For the file upload, you'd typically store a URL/path to the uploaded image.
    // We're not handling actual file uploads in this basic setup, so we'll omit
    // a field for the profile picture data itself, only the name.

    // Step 2: Contact (Primary Contact Person details)
    primaryContactName: {
        type: String,
        required: [true, 'Primary contact name is required'],
        trim: true
    },
    primaryContactRole: {
        type: String,
        required: [true, 'Primary contact role is required'],
        trim: true
    },
    primaryContactPhone: {
        type: String,
        required: [true, 'Primary contact phone is required'],
        trim: true
        // You might add custom validation for phone number format
    },
    primaryContactEmail: {
        type: String,
        required: [true, 'Primary contact email is required'],
        unique: true, // Assuming each primary contact email should be unique
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please fill a valid email address']
    },
    headquartersAddress: {
        type: String,
        required: [true, 'Headquarters address is required'],
        trim: true
    },

    // Step 3: Bank Website
    bankWebsiteUrl: {
        type: String,
        required: [true, 'Bank website URL is required'],
        trim: true,
        unique: true, // Assuming each bank has a unique website URL
        match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please fill a valid URL']
    },

    // Step 4: Business & Regulatory Information
    regulatoryLicenseId: {
        type: String,
        required: [true, 'Regulatory ID/License number is required'],
        unique: true, // Assuming each license ID is unique
        trim: true
    },
    bankType: {
        type: String,
        required: [true, 'Bank type is required'],
        enum: ['Public Sector', 'Private Sector', 'Cooperative', 'Investment Bank', 'Other'], // Enforce specific values
        trim: true
    },
    onboardDate: {
        type: Date, // Store as a Date object
        required: [true, 'Onboard date is required']
    },
    clientId: {
        type: String, // Or Number, depending on your client ID format
        required: [true, 'Client ID is required'],
        unique: true, // Assuming each client ID is unique
        trim: true
    },

    // Step 5: Account Management & Security (Administrator User Details)
    adminFullName: {
        type: String,
        required: [true, 'Administrator full name is required'],
        trim: true
    },
    securityContact: {
        type: String,
        required: [true, 'Security contact email is required'],
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please fill a valid email address']
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;