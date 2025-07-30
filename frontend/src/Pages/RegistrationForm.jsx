import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from "react-router-dom";

const FormIcon = ({ name, className }) => {
  switch (name) {
    case 'OrganizationProfile':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>;
    case 'RolesEmployees':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-5m-1.589-6.974a3 3 0 100 5.948h.001M17 14h.01M5 12h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v5a1 1 0 001 1zm0 0l-1.5 6m3.053-6.974L7.5 12"></path></svg>;
    case 'SchedulerSettings':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M16 11h.01M9 15h.01M15 15h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zM7 21h10a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
    case 'PaymentSettings':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;
    case 'CreateWorkOrder':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01"></path></svg>;
    case 'ChevronLeft':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>;
    case 'ChevronRight':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>;
    default:
      return null;
  }
};

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const totalSteps = 5;

    const [formData, setFormData] = useState({
        // Step 1: Core Identity
        organizationProfileName: '',

        // Step 2: Contact (Primary Contact Person details)
        primaryContactName: '',
        primaryContactRole: '',
        primaryContactPhone: '',
        primaryContactEmail: '',
        headquartersAddress: '',

        // Step 3: Bank Website
        bankWebsiteUrl: '',

        // Step 4: Business & Regulatory Information
        regulatoryLicenseId: '',
        bankType: '',
        onboardDate: '',
        clientId: '',

        // Step 5: Account Management & Security (Administrator User Details)
        adminFullName: '',
        securityContact: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(null); // New state for status messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        let isValid = true;
        setError(null); // Clear previous errors

        switch (step) {
            case 1:
                if (!formData.organizationProfileName) {
                    isValid = false;
                    setError('Please provide the Organization Name.');
                }
                break;
            case 2:
                if (!formData.primaryContactName || !formData.primaryContactRole || !formData.primaryContactPhone || !formData.primaryContactEmail || !formData.headquartersAddress) {
                    isValid = false;
                    setError('Please fill in all required fields for Contact Information.');
                }
                if (formData.primaryContactEmail && !/\S+@\S+\.\S+/.test(formData.primaryContactEmail)) {
                    isValid = false;
                    setError('Please enter a valid email address for Primary Contact Email.');
                }
                break;
            case 3:
                if (!formData.bankWebsiteUrl) {
                    isValid = false;
                    setError('Please provide the Bank Website URL.');
                }
                if (formData.bankWebsiteUrl && !/^https?:\/\/\S+/.test(formData.bankWebsiteUrl)) {
                    isValid = false;
                    setError('Please enter a valid URL for Bank Website (e.g., https://example.com).');
                }
                break;
            case 4:
                if (!formData.regulatoryLicenseId || !formData.bankType || !formData.onboardDate || !formData.clientId) {
                    isValid = false;
                    setError('Please fill in all required fields for Business & Regulatory Information.');
                }
                break;
            case 5:
                if (!formData.adminFullName || !formData.securityContact) {
                    isValid = false;
                    setError('Please fill in all required fields for Account Management & Security.');
                }
                break;
            default:
                break;
        }

        if (isValid && step < totalSteps) {
            setStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setError(null); // Clear errors when moving back
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);           // Clear previous errors
        setSubmissionStatus(null); // Clear previous status messages
        setLoading(true);         // Start loading

        setSubmissionStatus('Submitting registration...'); // Initial status message

        try {
            const response = await axios.post('http://localhost:5000/api/registration/register', formData);

            console.log('Backend response:', response.data);
            setSubmissionStatus('Registration complete! Data sent successfully.'); // Success message
            alert('Registration complete! Data sent to backend successfully.'); // Keep alert for immediate pop-up, or remove for cleaner UI
            setTimeout(() => {
                navigate("/dashboard");
             }, 1000);
            // Optionally, reset the form or redirect the user
            setFormData({
                organizationProfileName: '',
                primaryContactName: '',
                primaryContactRole: '',
                primaryContactPhone: '',
                primaryContactEmail: '',
                headquartersAddress: '',
                bankWebsiteUrl: '',
                regulatoryLicenseId: '',
                bankType: '',
                onboardDate: '',
                clientId: '',
                adminFullName: '',
                securityContact: '',
            });
            setStep(1); // Go back to the first step
        } catch (err) {
            console.error('Error during registration:', err);
            let userMessage = 'An unexpected error occurred during registration.';

            if (err.response) {
                // Server responded with a status code outside of 2xx range
                console.error('Server response data:', err.response.data);
                console.error('Server response status:', err.response.status);

                if (err.response.data.message) {
                    userMessage = `Server Error: ${err.response.data.message}`;
                }

                // More specific backend error details
                if (err.response.data.errors) {
                    // Mongoose Validation errors
                    const fieldErrors = Object.values(err.response.data.errors).map(e => e.message).join('; ');
                    userMessage += ` Details: ${fieldErrors}`;
                } else if (err.response.data.field) {
                    // Duplicate key errors
                    userMessage += ` (Issue with field: ${err.response.data.field})`;
                }
            } else if (err.request) {
                // Request was made but no response received (e.g., backend down, CORS issue)
                userMessage = 'No response from server. Please ensure the backend is running and accessible.';
                console.error('No response received (likely network/CORS):', err.request);
            } else {
                // Something else happened in setting up the request
                userMessage = `Request setup error: ${err.message}`;
            }

            setError(userMessage); // Set the detailed error message for display
            setSubmissionStatus('Registration failed!'); // Set status to failed
            // Consider removing this alert if the error message is prominently displayed on the UI
            alert(`Registration failed: ${userMessage}`);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    const sidebarNavItems = [
        { id: 1, name: 'Core Identity', icon: 'OrganizationProfile' },
        { id: 2, name: 'Contact', icon: 'RolesEmployees' },
        { id: 3, name: 'Bank Website', icon: 'SchedulerSettings' },
        { id: 4, name: 'Business & Regulatory Information', icon: 'PaymentSettings' },
        { id: 5, name: 'Account Management & Security', icon: 'CreateWorkOrder' },
    ];

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Organization Profile Picture</h3>
                        <label className="block w-fit cursor-pointer text-blue-600 hover:underline">
                            <input type="file" className="hidden" />Choose File
                        </label>

                        <div>
                            <label htmlFor="organizationProfileName" className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                            <input
                                type="text"
                                id="organizationProfileName"
                                name="organizationProfileName"
                                value={formData.organizationProfileName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Legal Name Of Bank or Institution"
                                required
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Primary Contact Information</h3>
                        <div>
                            <label htmlFor="primaryContactName" className="block text-sm font-medium text-gray-700 mb-1">Primary Contact Person Name</label>
                            <input
                                type="text"
                                id="primaryContactName"
                                name="primaryContactName"
                                value={formData.primaryContactName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Name of the main point of the contact"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="primaryContactRole" className="block text-sm font-medium text-gray-700 mb-1">Designation/Role</label>
                            <input
                                type="text"
                                id="primaryContactRole"
                                name="primaryContactRole"
                                value={formData.primaryContactRole}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Head of Treasury, Chief Financial Officer"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="primaryContactPhone" className="block text-sm font-medium text-gray-700 mb-1">Direct Phone No</label>
                                <input
                                    type="tel"
                                    id="primaryContactPhone"
                                    name="primaryContactPhone"
                                    value={formData.primaryContactPhone}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="For the primary contact."
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="primaryContactEmail" className="block text-sm font-medium text-gray-700 mb-1">Direct Email Address</label>
                                <input
                                    type="email"
                                    id="primaryContactEmail"
                                    name="primaryContactEmail"
                                    value={formData.primaryContactEmail}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="For the primary contact."
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="headquartersAddress" className="block text-sm font-medium text-gray-700 mb-1">Headquarters Address</label>
                            <input
                                type="text"
                                id="headquartersAddress"
                                name="headquartersAddress"
                                value={formData.headquartersAddress}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Primary physical address of the bank."
                                required
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Bank Website Information</h3>
                        <div>
                            <label htmlFor="bankWebsiteUrl" className="block text-sm font-medium text-gray-700 mb-1">Bank Website URL</label>
                            <input
                                type="url"
                                id="bankWebsiteUrl"
                                name="bankWebsiteUrl"
                                value={formData.bankWebsiteUrl}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="URL of the bank's public website."
                                required
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Business & Regulatory Information</h3>
                        <div>
                            <label
                                htmlFor="regulatoryLicenseId"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Regulatory ID/License Number
                            </label>
                            <input
                                type="text"
                                id="regulatoryLicenseId"
                                name="regulatoryLicenseId"
                                value={formData.regulatoryLicenseId}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="RBI license number in India"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="bankType"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Type of Bank
                            </label>
                            <select
                                id="bankType"
                                name="bankType"
                                value={formData.bankType}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                                required
                            >
                                <option value="" disabled>
                                    Select Type of Bank
                                </option>
                                <option value="Public Sector">Public Sector</option>
                                <option value="Private Sector">Private Sector</option>
                                <option value="Cooperative">Cooperative</option>
                                <option value="Investment Bank">Investment Bank</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="onboardDate"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Date Of Onboard
                                </label>
                                <input
                                    type="date"
                                    id="onboardDate"
                                    name="onboardDate"
                                    value={formData.onboardDate}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="clientId"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Client ID
                                </label>
                                <input
                                    type="text"
                                    id="clientId"
                                    name="clientId"
                                    value={formData.clientId}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 99876"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Administrator User Details</h3>
                        <div>
                            <label htmlFor="adminFullName" className="block text-sm font-medium text-gray-700 mb-1">Administrator Full Name</label>
                            <input
                                type="text"
                                id="adminFullName"
                                name="adminFullName"
                                value={formData.adminFullName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Full Name (Different from primary contact if necessary)"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="securityContact" className="block text-sm font-medium text-gray-700 mb-1">Security Contact</label>
                            <input
                                type="email"
                                id="securityContact"
                                name="securityContact"
                                value={formData.securityContact}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Contact for security-related notifications (Email address)."
                                required
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-6 font-sans">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        `}</style>

        <div className="w-full max-w-5xl flex bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Left Sidebar Navigation */}
            <div className="w-100 bg-white p-8 border-r border-gray-200 flex flex-col justify-between">
                <div>
                    {/* Logo area */}
                    <div className="flex items-center mb-10">
                        <img
                            src="https://placehold.co/40x40/6B46C1/FFFFFF?text=SL"
                            alt="StarLand Logo"
                            className="w-10 h-10 rounded-lg mr-3"
                        />
                        <span className="text-2xl font-bold text-gray-900">Above All</span>
                    </div>

                    {/* Navigation Steps */}
                    <nav className="space-y-4">
                        {sidebarNavItems.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                        step >= item.id
                                            ? 'bg-purple-100 border-purple-600 text-purple-600'
                                            : 'border-gray-300 text-gray-500'
                                    } flex-shrink-0`}
                                >
                                    <FormIcon name={item.icon} className="h-5 w-5" />
                                </div>
                                <span
                                    className={`ml-3 text-lg font-medium ${
                                        step >= item.id ? 'text-gray-900' : 'text-gray-600'
                                    }`}
                                >
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Right Form Content */}
            <div className="flex-1 p-10 flex flex-col justify-between">
                <div>
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900">Welcome to Above All</h1>
                        <p className="text-gray-600 mt-2">Complete the {totalSteps} steps to get started</p>
                    </div>

                    {/* Progress Bar and Percentage */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {sidebarNavItems.find(item => item.id === step)?.name}
                            </h2>
                            <span className="text-purple-600 font-semibold">{Math.round((step / totalSteps) * 100)} %</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: `${(step / totalSteps) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    )}

                    {/* Submission Status Display */}
                    {submissionStatus && !error && (
                        <div
                            className={`px-4 py-3 rounded relative mb-6 ${
                                submissionStatus.includes('complete')
                                    ? 'bg-green-100 border border-green-400 text-green-700'
                                    : submissionStatus.includes('Submitting')
                                    ? 'bg-blue-100 border border-blue-400 text-blue-700'
                                    : 'bg-gray-100 border border-gray-400 text-gray-700'
                            }`}
                            role="status"
                        >
                            <strong className="font-bold">Status:</strong>
                            <span className="block sm:inline ml-2">{submissionStatus}</span>
                        </div>
                    )}

                    {/* Entire Form including buttons */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderStepContent()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-center items-center space-x-4 mt-8">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={step === 1 || loading}
                                className={`p-3 rounded-full ${
                                    step === 1 || loading
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                } transition-colors duration-200`}
                            >
                                <FormIcon name="ChevronLeft" className="w-6 h-6" />
                            </button>

                            {step < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={loading}
                                    className="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 transition-colors duration-200"
                                >
                                    {loading ? 'Processing...' : 'Next Step'}
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    {loading ? 'Registering...' : 'Complete Registration'}
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={step === totalSteps || loading}
                                className={`p-3 rounded-full ${
                                    step === totalSteps || loading
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                } transition-colors duration-200`}
                            >
                                <FormIcon name="ChevronRight" className="w-6 h-6" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );

};

export default RegistrationForm;