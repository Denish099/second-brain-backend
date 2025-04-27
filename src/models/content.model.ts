import mongoose, { Types } from "mongoose";

const contentTypes = ["link", "tweet", "image", "vedio", "article"];

const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const Content = mongoose.model("Content", contentSchema);
