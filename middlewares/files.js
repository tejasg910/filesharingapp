import multer from "multer";
// configuring storage for multer to use
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/");
  },
  filename: (req, file, cb) => {
    cb(null, req.user.email + file.originalname);
  },
});

// creating middleware for routes
export const upload = multer({ storage: storage });
