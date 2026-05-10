import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },

      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    console.log("Email yuborildi");

  } catch (error) {
    console.error("Email xatosi:", error);
  }
};