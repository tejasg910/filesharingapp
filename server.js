import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.use("use-");

//configuring multer

///used to specify the storage and name of the file
app.use("/files", "./routes/files.js");

app.listen(800, () => {
  console.log("server started");
});
