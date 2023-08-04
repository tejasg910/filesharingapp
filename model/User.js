import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.model("User", userSchema);
