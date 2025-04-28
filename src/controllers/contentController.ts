import { Request, Response } from "express";
import { Content } from "../models/content.model";

export const addContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { link, title } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const userContent = new Content({
      link,
      title,
      userId: req.user?.id,
    });

    await userContent.save();

    res.status(201).json({
      message: "Content added successfully",
      content: userContent,
    });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getContent = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    res.status(200).json({
      message: "Content fetched successfully",
      contents,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id; // req.user is string (userId)

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const contentId = req.body.contentId;
    const content = await Content.findOneAndDelete({ _id: contentId, userId });

    if (!content) {
      res.status(404).json({
        message: "Content not found or you are not authorized to delete it",
      });
      return;
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
