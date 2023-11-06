import nodemailer from 'nodemailer';

const sendVerificationEmail = async (recipientEmail, verificationCode) => {

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });


  const mailOptions = {
    from: 'your-email@gmail.com',
    to: recipientEmail,
    subject: 'Account Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  try {

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export { sendVerificationEmail };
