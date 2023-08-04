import nodemailer from "nodemailer";
import { Files } from "../model/FIles.js";
import { User } from "../model/User.js";
import { sendEmail } from "../utility/sendEmail.js";
export const addFile = (req, res) => {
  const { receivedEmail, description } = req.body;
  console.log(req.file);
  if (!req.file || !req.body.receivedEmail) {
    return res.json({ success: false, message: "invalid Details" });
  }

  if (!receivedEmail) {
    return res
      .status(400)
      .jsno({ success: false, message: "No user provided" });
  }
  let { to } = req.body;

  //find the the user whose email is equal to reviceb email

  User.findOne({ email: receivedEmail }).then((user) => {
    //pending

    if (user) {
      //saving file in database

      let file = new Files({
        filedetails: req.file,
        to: user._id,
        owner: req.user.id,
        description,
      });
      file
        .save()
        .then(() => {
          //send email to the receiver

          sendEmail(file.filedetails.originalname, receivedEmail);

          return res
            .status(200)
            .json({ success: true, message: "File uploaded" });
        })
        .catch((err) => res.json({ success: false, message: err.message }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "No user found with this email" });
    }
  });
};

export const getAllReceivedFiles = (req, res) => {
  Files.find({ to: req.user.id })
    .then((files) => res.json({ success: true, files }))
    .catch((err) => res.json({ success: false, message: err.message }));
};

export const getAllSentFiles = (req, res) => {
  Files.find({ owner: req.user.id })
    .then((files) => res.json({ success: true, files }))
    .catch((err) => res.json({ success: false, message: err.message }));
};
