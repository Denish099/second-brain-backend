import { Request, Response } from "express";
import { Content } from "../models/content.model";

export const addContent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { link, title, type } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const userContent = new Content({
      link,
      title,
      type,
      userId: req.user?.id,
      tags: [],
    });

    await userContent.save();

    return res.status(201).json({
      message: "Content added successfully",
      content: userContent,
    });
  } catch (error) {
    console.error("Error adding content:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getContent = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const contents = await Content.find({ userId }).populate(
      "userId",
      "username"
    );

    return res.status(200).json({
      message: "Content fetched successfully",
      contents,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.user?.id; // req.user is string (userId)

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const contentId = req.body.contentId;

    const content = await Content.findOneAndDelete({ _id: contentId, userId });

    if (!content) {
      return res.status(404).json({
        message: "Content not found or you are not authorized to delete it",
      });
    }

    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
