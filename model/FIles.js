import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  filedetails: {},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: String,
});

export const Files = mongoose.model("Files", fileSchema);
