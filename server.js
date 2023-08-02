import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
const app = express();
import { configDotenv } from "dotenv";

configDotenv({
  path: "./config/.env",
});
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// app.use("use-");

//configuring multer

///used to specify the storage and name of the file

import files from "./routes/files.js";
// configuring express routes
import auth from "./routes/auth.js";
app.use("/auth", auth);
app.use("/files", files);

// database connections
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database Connnected"))
  .catch(() => console.log("Database Connection Failed"));

app.listen(PORT, () => {
  console.log("server started at ", PORT);
});
