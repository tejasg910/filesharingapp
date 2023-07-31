import multer from "multer";

//configuring file storage and naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "photos/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//returing a middleware

export const upload = multer({ dest: "photos/" });
