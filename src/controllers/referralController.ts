import { Request, Response } from 'express'
import { prisma } from '../index'
import { validateReferralData } from '../utils/validation';
import { sendReferralEmail } from '../utils/emailService';

const createReferral = async (req: Request, res: Response) => {
    try {
        const { yourName, name, email, phone, message } = req.body;

        // Validate input
        const validationError = validateReferralData({ yourName, name, email, phone, message });
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const referralCode = `${yourName.toUpperCase()}${Math.random().toString(36).substring(7).toUpperCase()} `;

        const referral = await prisma.referral.create({
            data: {
                yourName,
                name,
                email,
                phone,
                message,
                referralCode
            }
        })
        await sendReferralEmail(referral);

        res.status(201).json(referral);

    } catch (err) {
        console.error("Error creating referral: ", err)
        res.status(500).json({ error: 'Oops! Internal server error' });
    }
}

export { createReferral }