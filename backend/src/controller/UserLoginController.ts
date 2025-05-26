import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

export class UserLoginController {
  private userRepository = AppDataSource.getRepository(User);

  // User login
  async login(req: Request, res: Response): Promise<Response> {
    const { email, passwordHash } = req.body;

    if (!email || !passwordHash) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await this.userRepository.findOneBy({ email });

    if (!user || user.password_hash !== passwordHash) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret", // Use a secure secret in production
      { expiresIn: "1h" },
    );

    return res.status(200).json({ message: "Login successful.", token });
  }
}
