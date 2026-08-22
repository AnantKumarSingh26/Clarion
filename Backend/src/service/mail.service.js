import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    // service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    // auth: {
    //     user: process.env.GOOGLE_USER,
    //     pass: process.env.GOOGLE_APP_PASSWORD,
    // },
    host:process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: Number(process.env.BREVO_SMTP_PORT ) || 587,
    secure:false,
    auth:{
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_API_KEY
    }

})
transporter.verify()
    .then(() => {
        console.log('Email transporter is ready to send emails with Brevo')
    })
    .catch((err) => {
        console.error('Email transporter verification failed', err)
    })

export async function sendEmail(to, subject, html, text) {
    const mailOptions = {
        from:` Clarion <${process.env.GOOGLE_USER || process.env.BREVO_SMTP_USER}`,
         to,
        subject,
        html,
        text
    };
    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
}