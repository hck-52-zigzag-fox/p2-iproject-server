const nodemailer = require("nodemailer")

function registerSuccess(email){
    let transporter = nodemailer.createTransport({
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: "dodoru26@gmail.com",
            pass: process.env.NODEMAILER_PASS
        },
    });
    let info = transporter.sendMail({
        from: 'dodoru26@gmail.com',
        to: email,
        subject: "Register Success!",
        text: `Hello ${email}, welcome to Uap Games, please enjoy`,
    });
}

module.exports = {registerSuccess}