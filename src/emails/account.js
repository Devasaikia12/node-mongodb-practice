const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SG_KEY)
const sendMail = ({ email, subject, text }) => {
    const msg = {
        to: email,
        from: 'saikiadeva12@outlook.com',
        subject: subject,
        text: text,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email Sent')
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = { sendMail }