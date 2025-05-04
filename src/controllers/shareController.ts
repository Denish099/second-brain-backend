import { Request, Response } from "express";
import { Link } from "../models/link.model";
import { random } from "../utils/utils";
import { Content } from "../models/content.model";
import { User } from "../models/user.model";
import mongoose from "mongoose";

export const generateLink = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { share } = req.body;

    if (share) {
      await Link.create({
        userId: req.user?.id,
        hash: random(10),
      });
    } else {
      await Link.deleteOne({
        userId: req.user?.id,
      });
    }

    return res.json({ message: "Updated shared link" });
  } catch (error) {
    console.error("Error sharing link:", error);
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
