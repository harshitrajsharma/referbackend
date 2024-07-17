"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReferralData = validateReferralData;
function validateReferralData(data) {
    if (!data.yourName || data.yourName.trim() === '') {
        return 'Your Name is required';
    }
    if (!data.name || data.name.trim() === '') {
        return 'Name is required';
    }
    if (!data.email || !isValidEmail(data.email)) {
        return 'Valid email is required';
    }
    if (data.phone && !isValidPhone(data.phone)) {
        return 'Invalid phone number format';
    }
    return null;
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPhone(phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}
