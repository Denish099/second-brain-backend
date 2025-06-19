import mongoose, { Types } from "mongoose";
import { string } from "zod";

const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  type: String,
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const Content = mongoose.model("Content", contentSchema);
