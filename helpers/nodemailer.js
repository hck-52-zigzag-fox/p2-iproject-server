const nodemailer = require("nodemailer");
const env = require("dotenv");

env.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 25,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = (email, username) => {
  let message = {
    from: process.env.AUTH_EMAIL,
    to: `${email}`,
    subject: `Welcome to RZ Gaming Community`,
    text: `Hey ${username},
        Have fun in our community`,
  };
  transporter.sendMail(message);
};

module.exports = sendMail;
