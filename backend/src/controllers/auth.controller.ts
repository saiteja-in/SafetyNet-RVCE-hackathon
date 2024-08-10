import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error";
import { ObjectId } from 'mongoose';

// Define the IUser interface based on your User schema
interface IUser {
  _id: string|ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePicture?: string;
  _doc?: any; // Include this if you're accessing the document directly
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(errorHandler(400, "All fields are required"));
    return;
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const newUser: IUser = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
    };
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(errorHandler(400, "All fields are required"));
    return;
  }

  try {
    const user = await User.findOne({ email }) as IUser | null;
    if (!user) {
      next(errorHandler(400, "User not found"));
      return;
    }

    const passwordMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordMatch) {
      next(errorHandler(400, "Invalid credentials"));
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as jwt.Secret
    );

    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("teja_token", token)
      .json({ message: "User logged in successfully", user: rest });
  } catch (error) {
    next(error);
  }
};

export const google = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, googlePhotoURL } = req.body;

  try {
    let user = await User.findOne({ email }) as IUser | null;

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as jwt.Secret
      );

      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("teja_token", token, { httpOnly: true })
        .json({ message: "User logged in successfully", user: rest });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = await User.create({
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(36).slice(-8),
        email,
        profilePicture: googlePhotoURL,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET as jwt.Secret
      );

      const { password: pass, ...rest } = newUser;
      res
        .status(200)
        .cookie("teja_token", token, { httpOnly: true })
        .json({ message: "User created successfully", user: rest });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .clearCookie("teja_token")
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};
