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

        requireTLS: true,

        auth: {

          user: process.env.BREVO_EMAIL,

          pass: process.env.BREVO_PASS,
        },

        tls: {
          rejectUnauthorized: false,
        },

        connectionTimeout: 20000,
      });

    const info =
      await transporter.sendMail({

        from: "djurayevdavron7@gmail.com",

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
