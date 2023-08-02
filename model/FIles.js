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
});

export const Files = mongoose.model("Files", fileSchema);
