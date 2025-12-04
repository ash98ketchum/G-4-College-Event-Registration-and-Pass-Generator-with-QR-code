import type { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

/**
 * Register Controller
 */
export const register = async (req: Request, res: Response) => {
  const { name, email, college, phone, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Email already registered" });

  // role is optional, defaults to "user"
  const user = await User.create({
    name,
    email,
    college,
    phone,
    password,
    role: role || "user"
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
};

/**
 * Login Controller
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
};
export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user });
};