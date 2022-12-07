const nodemailer = require('nodemailer')

function sendEmail(email) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.gmail",
      port: 465,
      service: "gmail",
      secure: true,
      auth: {
        user: "markus.sarsanto@gmail.com",
        pass: "asdjahsgdausgd",
      },
      debug: true,
      logger: true,
    });
    let base_url = "http://localhost:3000/";
    const option = {
      from: "markus.sarsanto@gmail.com",
      to: email,
      subject: "[SCA-REMINDER] Bookmark on SCA (Shopping Comparement App) is waiting! Do not miss the chance!",
      text: "Shopping is ongoing, will arrived by 3 days or less if you buy RIGHT NOW",
      html: `Checkout more on: ${base_url}`,
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
  
  module.exports = sendEmail;