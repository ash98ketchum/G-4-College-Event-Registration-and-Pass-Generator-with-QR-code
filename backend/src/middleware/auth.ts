import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: any; // populated with user document
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

    // Find user in DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
