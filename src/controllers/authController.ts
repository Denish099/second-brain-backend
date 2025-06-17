import { Request, Response } from "express";
import { userSchema } from "../zod/zod";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "YOUR_SECRET_KEY";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    const validatedData = userSchema.parse({ username, password });

    const existingUser = await User.findOne({
      username: validatedData.username,
    });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const newUser = new User({
      username: validatedData.username,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    if (error instanceof Error && "issues" in error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: (error as any).issues,
      });
    }

    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    const validatedData = userSchema.parse({ username, password });

    const user = await User.findOne({ username: validatedData.username });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getCurrentUser = (req: Request, res: Response) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("error in getUserController");
    res.status(400).json({ message: "server error" });
  }
};
