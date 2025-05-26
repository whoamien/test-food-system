import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AdminUser } from "../entity/AdminUser";
import jwt from "jsonwebtoken";

export class AdminUserController {
  private adminUserRepository = AppDataSource.getRepository(AdminUser);

  // Admin login
  async login(req: Request, res: Response): Promise<Response> {
    const { username, passwordHash } = req.body;

    if (!username || !passwordHash) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const adminUser = await this.adminUserRepository.findOneBy({ username });

    if (!adminUser || adminUser.password_hash !== passwordHash) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: adminUser.id, username: adminUser.username },
      process.env.JWT_SECRET || "your_jwt_secret", // Use a secure secret in production
      { expiresIn: "1h" },
    );

    return res.status(200).json({ message: "Login successful.", token });
  }
}
