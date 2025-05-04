import { User } from "../models/user.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Link } from "../models/link.model";
import { random } from "../utils/utils";
import { Content } from "../models/content.model";
export const generateLink = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { share } = req.body;
    const userId = req.user?.id;

    const existingLink = await Link.findOne({ userId });

    if (share) {
      if (existingLink) {
        return res.json({ message: "/share/" + existingLink.hash });
      }

      const hash = random(10);
      await Link.create({ userId, hash });

      return res.json({ message: "/share/" + hash });
    } else {
      if (!existingLink) {
        return res.status(404).json({ message: "No link to delete." });
      }

      await Link.deleteOne({ userId });
      return res.json({ message: "Removed shareable link successfully" });
    }
  } catch (error) {
    console.error("Error generating link:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const shareLink = async (req: Request, res: Response): Promise<any> => {
  try {
    const hash = req.params.shareLink;

    const link = await Link.findOne({ hash });

    if (!link) {
      return res.status(404).json({
        message: "Invalid or expired share link.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(link.userId)) {
      return res.status(400).json({
        message: "Invalid user ID in link.",
      });
    }

    const [content, user] = await Promise.all([
      Content.find({ userId: link.userId }),
      User.findById(link.userId),
    ]);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.json({
      username: user.username,
      content,
    });
  } catch (err) {
    console.error("Error in shareLink:", err);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
