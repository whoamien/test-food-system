import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AdminUserService } from "../service/AdminUserService";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret",
    );
    (req as any).user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Checks for a valid JWT token and admin status
export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret",
    );
    (req as any).user = decoded;
    const user = (req as any).user;
    if (!user || !user.id) {
      return res.status(403).json({ message: "Admin authorization required." });
    }
    const adminUserService = new AdminUserService();
    const isAdmin = await adminUserService.isAdminUser(user.id);
    if (isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Admin authorization required." });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
