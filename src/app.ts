import express from "express";
import sendNewMail from "./queues/emailQueue";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-email", async (req, res) => {
  const { from, to, subject, text } = req.body;

  await sendNewMail({ from, to, subject, text });

  res.status(200).json({ message: "Email job added to queue successfully" });
});

app.listen(3000, () => {
  console.log(`server is connected at http://localhost:3000`);
});
