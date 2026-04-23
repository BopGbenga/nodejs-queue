import Bull from "bull";
import emailProcess from "../processes/emailProcess";

const emailQueue = new Bull("email", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

emailQueue.process(emailProcess);

const sendNewMail = async (email: {
  from: string;
  to: string;
  subject: string;
  text: string;
}) => {
  await emailQueue.add(
    { ...email },
    {
      attempts: 3,
    },
  );
};

export default sendNewMail;
