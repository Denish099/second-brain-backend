import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Link = mongoose.model("Link", LinkSchema);
