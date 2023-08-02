import { Files } from "../model/FIles.js";
export const addFile = (req, res) => {
  if (!req.file || !req.body.to) {
    return res.json({ success: false, message: "invalid Details" });
  }

  let { to } = req.body;

  let file = new Files({ filedetails: req.file, to: to, owner: req.user.id });
  file
    .save()
    .then(() => res.json({ success: true, message: "File Uploaded" }))
    .catch((err) => res.json({ success: false, message: err.message }));
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
