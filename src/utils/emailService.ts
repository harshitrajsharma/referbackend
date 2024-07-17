import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendReferralEmail(referral: any) {
    console.log("Mail is sent")
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
    await transporter.sendMail(mailOptions);
    console.log('Referral email sent successfully');
  } catch (error) {
    console.error('Error sending referral email:', error);
  }
}