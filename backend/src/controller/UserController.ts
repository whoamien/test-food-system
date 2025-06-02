import { Request, Response } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { UserService } from '../service/UserService';

export class UserController {
	// List all users (admin only)
	async list(req: Request, res: Response) {
		if ((req as any).user.role !== 'admin') {
			return res.status(403).json({ message: 'Admin authorization required.' });
		}
		try {
			const { search, page = 1, pageSize = 10 } = req.query;
			const userService = UserService.getInstance();
			const result = await userService.list({
				...(typeof search === 'object' && search !== null ? search : {}),
				page: typeof page === 'string' ? parseInt(page, 10) : typeof page === 'number' ? page : 1,
				pageSize:
					typeof pageSize === 'string'
						? parseInt(pageSize, 10)
						: typeof pageSize === 'number'
							? pageSize
							: 10,
			});
			res.json(result);
		} catch (error) {
			res.status(500).json({
				message: 'Failed to list users',
				error: (error as Error).message,
			});
		}
	}

	// Get user by id (admin or user himself)
	async get(req: Request, res: Response) {
		const userId = parseInt(req.params.id, 10);
		const reqUser = (req as any).user; // Extracted from the token by authMiddleware
		if (!reqUser) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		if (reqUser.id !== userId) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		const userRepo = AppDataSource.getRepository(User);
		const user = await userRepo.findOne({
			where: { id: userId, status: 'active' },
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	}

	// Add new user (admin only)
	async add(req: Request, res: Response) {
		if ((req as any).user.role !== 'admin') {
			return res.status(403).json({ message: 'Admin authorization required.' });
		}
		const { name, email, passwordHash } = req.body;
		try {
			// Use the create method in UserService to create user
			const userService = UserService.getInstance();
			const user = await userService.create({
				name,
				email,
				password_hash: passwordHash,
				status: 'active',
			});
			res.status(201).json(user);
		} catch (error) {
			res.status(400).json({
				message: 'Failed to create user',
				error: (error as Error).message,
			});
		}
	}

	// Update user (admin only)
	async update(req: Request, res: Response) {
		if ((req as any).user.role !== 'admin') {
			return res.status(403).json({ message: 'Admin authorization required.' });
		}
		const userId = parseInt(req.params.id, 10);
		try {
			const userService = UserService.getInstance();
			const updatedUser = await userService.update(userId, req.body);
			if (!updatedUser) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(updatedUser);
		} catch (error) {
			res.status(400).json({
				message: 'Failed to update user',
				error: (error as Error).message,
			});
		}
	}

	// Soft delete user (admin only)
	async delete(req: Request, res: Response) {
		if ((req as any).user.role !== 'admin') {
			return res.status(403).json({ message: 'Admin authorization required.' });
		}
		const userId = parseInt(req.params.id, 10);
		try {
			const userService = UserService.getInstance();
			const deleted = await userService.delete(userId);
			if (!deleted) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json({ message: 'User soft deleted' });
		} catch (error) {
			res.status(400).json({
				message: 'Failed to delete user',
				error: (error as Error).message,
			});
		}
	}
}
