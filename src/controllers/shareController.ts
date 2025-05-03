import { Request, Response } from "express";
import { Link } from "../models/link.model";
import { random } from "../utils/utils";

export const shareLink = async (req: Request, res: Response): Promise<any> => {
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
