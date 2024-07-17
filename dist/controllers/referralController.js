"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReferral = void 0;
const index_1 = require("../index");
const validation_1 = require("../utils/validation");
const emailService_1 = require("../utils/emailService");
const createReferral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { yourName, name, email, phone, message } = req.body;
        // Validate input
        const validationError = (0, validation_1.validateReferralData)({ yourName, name, email, phone, message });
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }
        const referralCode = `${yourName.toUpperCase()}${Math.random().toString(36).substring(7).toUpperCase()} `;
        const referral = yield index_1.prisma.referral.create({
            data: {
                yourName,
                name,
                email,
                phone,
                message,
                referralCode
            }
        });
        yield (0, emailService_1.sendReferralEmail)(referral);
        res.status(201).json(referral);
    }
    catch (err) {
        console.error("Error creating referral: ", err);
        res.status(500).json({ error: 'Oops! Internal server error' });
    }
});
exports.createReferral = createReferral;
