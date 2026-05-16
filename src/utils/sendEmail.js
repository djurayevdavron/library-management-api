import nodemailer from "nodemailer";

export const sendEmail = async (
  to,
  subject,
  text
) => {
  try {
    const transporter =
      nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },

        tls: {
          rejectUnauthorized: false,
        },

        connectionTimeout: 10000,
      });

    const info =
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      });

    console.log(
      "EMAIL YUBORILDI:",
      info.response
    );
  } catch (error) {
    console.log(
      "EMAIL ERROR:",
      error
    );
  }
};
