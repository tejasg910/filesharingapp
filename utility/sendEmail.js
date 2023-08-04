//sending the email
// send an alert email to the receiver
import nodemailer from "nodemailer";
export const sendEmail = async (fileName, receiverEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILEREMAIL,
        pass: process.env.NODEMAILERPASSWORD,
      },
    });

    let mailDetails = {
      from: process.env.NODEMAILEREMAIL,
      to: receiverEmail,
      subject: "File has Been Shared with you !",
      text: `Hello, A file has been shared with you. 
        File Name: ${fileName}`,
    };
    console.log(mailDetails);
    await transporter.sendMail(mailDetails);
  } catch (error) {
    console.log(error);
  }
};
