import nodemailer from "nodemailer";

export const sendEmail = async (
  to,
  subject,
  text
) => {
  try {

    const transporter =
      nodemailer.createTransport({
        host: "smtp-relay.brevo.com",

        port: 2525,

        secure: false,

        auth: {
          user: process.env.BREVO_EMAIL,
          pass: process.env.BREVO_PASS,
        },

        connectionTimeout: 10000,
      });

    const info =
      await transporter.sendMail({
        from: process.env.BREVO_EMAIL,
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
