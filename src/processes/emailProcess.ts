import { Job } from "bull";
import nodemailer from "nodemailer";

const emailProcess = async (job: Job) => {
  console.log(`processing email job`, job.data);

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const { from, to, subject, text } = job.data;

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });

  console.log(`Email sent: ${info.messageId}`);
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
};

export default emailProcess;
