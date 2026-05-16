import nodemailer from "nodemailer";

export const sendEmail = async (
  to,
  subject,
  text
) => {
  try {
    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        secure: true,

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
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
