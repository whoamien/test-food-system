import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AdminUser } from '../entity/AdminUser';
import * as jwt from 'jsonwebtoken';
import { comparePassword } from '../util/security';
import { instanceToPlain } from 'class-transformer';

export class AdminUserLoginController {
	private adminUserRepository = AppDataSource.getRepository(AdminUser);

	// Admin login
	async login(req: Request, res: Response): Promise<Response> {
		const { username, passwordHash } = req.body;

		if (!username || !passwordHash) {
			return res.status(400).json({ message: 'Username and password are required.' });
		}

		const adminUser = await this.adminUserRepository.findOneBy({ username });

		if (!adminUser) {
			return res.status(401).json({ message: 'Invalid username or password.' });
		}

		const passwordMatch = await comparePassword(passwordHash, adminUser?.password_hash);
		if (!passwordMatch) {
			return res.status(401).json({ message: 'Invalid username or password.' });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ adminUser, role: 'admin' },
			process.env.JWT_SECRET || 'your_jwt_secret', // Use a secure secret in production
			{ expiresIn: '1h' }
		);

		return res.status(200).json({
			message: 'Login successful.',
			token,
			adminUser: instanceToPlain(adminUser),
		});
	}
}
