import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import { comparePassword } from '../util/security';
import { instanceToPlain } from 'class-transformer';

export class UserLoginController {
	private userRepository = AppDataSource.getRepository(User);

	// User login
	async login(req: Request, res: Response): Promise<Response> {
		const { username, email, passwordHash } = req.body;

		if ((!email && !username) || !passwordHash) {
			return res.status(400).json({ message: 'Email/Username and password are required.' });
		}

		const user = await this.userRepository.findOneBy(email ? { email } : { username });

		if (!user) {
			return res.status(401).json({ message: 'Invalid email or username.' });
		}

		const passwordMatch = await comparePassword(passwordHash, user.password_hash);
		if (!passwordMatch) {
			return res.status(401).json({ message: 'nvalid email or username or password.' });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ user },
			process.env.JWT_SECRET || 'your_jwt_secret', // Use a secure secret in production
			{ expiresIn: '1h' }
		);

		return res.status(200).json({
			message: 'Login successful.',
			token,
			user: instanceToPlain(user),
		});
	}
}
