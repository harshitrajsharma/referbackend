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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReferralEmail = sendReferralEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
function sendReferralEmail(referral) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Mail is sent");
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: referral.email,
            subject: 'You got a New Referral',
            text: `
      You have been referred by ${referral.yourName} to ${referral.name}.:
      Name: ${referral.name}
      Phone: ${referral.phone || 'N/A'}
      Message: ${referral.message || 'N/A'}
      Referral Code: ${referral.referralCode}
    `,
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log('Referral email sent successfully');
        }
        catch (error) {
            console.error('Error sending referral email:', error);
        }
    });
}
