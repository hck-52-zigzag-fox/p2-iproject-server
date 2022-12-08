const nodemailer = require("nodemailer");

function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    service: "gmail",
    secure: true,
    auth: {
      user: "muhammadjanu30@gmail.com",
      pass: "jbhrzgzfrclicgxn",
    },
    debug: true,
    logger: true,
  });
  const option = {
    from: "muhammadjanu30@gmail.com",
    to: email,
    subject: "Success Create Account!",
    text: "Your motorcycle is ready to ride!",
    html: `Congratulation, your account has been created. Keep your eyes on the track an avoid every accidents, Speeding is live.`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve("success");
      console.log("sent: " + info);
    });
  });
}

module.exports = { sendEmail };
