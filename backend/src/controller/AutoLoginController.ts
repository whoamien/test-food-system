import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { AdminUser } from '../entity/AdminUser';
import { instanceToPlain } from 'class-transformer';

export class AutoLoginController {
	private userRepository = AppDataSource.getRepository(User);
	private adminUserRepository = AppDataSource.getRepository(AdminUser);

	// Auto-login for regular users
	async autoLoginUser(req: Request, res: Response): Promise<Response> {
		const user = (req as any).user; // Extracted from the token by authMiddleware

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized.' });
		}

		const foundUser = await this.userRepository.findOneBy({ id: user.id });

		if (!foundUser) {
			return res.status(404).json({ message: 'User not found.' });
		}

		return res.status(200).json({
			message: 'Auto-login successful.',
			user: instanceToPlain(foundUser),
		});
	}

	// Auto-login for admin users
	async autoLoginAdmin(req: Request, res: Response): Promise<Response> {
		const adminUser = (req as any).adminUser; // Extracted from the token by authMiddleware

		if (!adminUser) {
			return res.status(401).json({ message: 'Unauthorized.' });
		}

		const foundAdmin = await this.adminUserRepository.findOneBy({
			id: adminUser.id,
		});

		if (!foundAdmin) {
			return res.status(404).json({ message: 'Admin user not found.' });
		}

		return res.status(200).json({
			message: 'Auto-login successful.',
			adminUser: instanceToPlain(foundAdmin),
		});
	}
}
