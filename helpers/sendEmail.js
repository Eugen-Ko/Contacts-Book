const nodemailer = require("nodemailer");
require('dotenv').config();

const { SENDER_MAIL } = process.env;
const { GOOGLE_APP_CODE } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: SENDER_MAIL,
    pass: GOOGLE_APP_CODE,
  },
})

const sendEmail = async (data) => {
  const email = { ...data, from: SENDER_MAIL }
  // eslint-disable-next-line no-useless-catch
  try {
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;