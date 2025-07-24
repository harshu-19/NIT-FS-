// certificate/sendCertificateEmail.js
const nodemailer = require("nodemailer");
const fs = require("fs");

const sendCertificateEmail = async (userEmail, userName, courseName, certPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"EduPlatform" <${process.env.MAIL_USER}>`,
    to: userEmail,
    subject: `Certificate of Completion: ${courseName}`,
    text: `Hi ${userName},\n\nAttached is your certificate for completing the "${courseName}" course.\n\nCongratulations!\n\nEduPlatform Team`,
    attachments: [
      {
        filename: `${userName}_${courseName}_certificate.pdf`,
        path: certPath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Certificate email sent successfully.");
  } catch (err) {
    console.error("Failed to send certificate email:", err);
    throw err;
  } finally {
    fs.unlink(certPath, () => {}); // Remove temp file after sending
  }
};

module.exports = sendCertificateEmail;
