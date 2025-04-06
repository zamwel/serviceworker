import nodemailer, { SendMailOptions } from "nodemailer";


type EmailPayload = {
    to: string;
    subject: string;
    html: string;
}
export const sendEmail = async (payload: EmailPayload) => {
    try {
        const { to, subject, html } = payload;
        
        const transporter = nodemailer.createTransport({
            host: "smtp.titan.email",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Store in .env
                pass: process.env.EMAIL_PASS, // Store in .env
            },
        });

        const mailOptions: SendMailOptions = {
            from: `PLUTUS<${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        return info
    } catch (error: any) {
        throw new Error(error.message)
    }
}