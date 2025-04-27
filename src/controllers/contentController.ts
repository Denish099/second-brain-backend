import { Request, Response } from "express";

export const addContent = (req: Request, res: Response) => {
  const { link, title } = req.body;
};
