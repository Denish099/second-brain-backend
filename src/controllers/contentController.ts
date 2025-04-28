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
