import { Request, Response } from 'express';
import { AdminUserService } from '../service/AdminUserService';

export class AdminUserController {
	async getAll(req: Request, res: Response) {
		try {
			const adminUserService = AdminUserService.getInstance();
			const users = await adminUserService.getAllAdminUsers();
			res.json(users);
		} catch (error) {
			res.status(500).json({ message: 'Failed to fetch admin users.' });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const adminUserService = AdminUserService.getInstance();
			const user = await adminUserService.getAdminUserById(Number(req.params.id));
			if (!user) {
				return res.status(404).json({ message: 'Admin user not found.' });
			}
			res.json(user);
		} catch (error) {
			res.status(500).json({ message: 'Failed to fetch admin user.' });
		}
	}

	async create(req: Request, res: Response) {
		try {
			const adminUserService = AdminUserService.getInstance();
			const newUser = await adminUserService.createAdminUser(req.body);
			res.status(201).json(newUser);
		} catch (error) {
			res.status(400).json({ message: 'Failed to create admin user.' });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const adminUserService = AdminUserService.getInstance();
			const updatedUser = await adminUserService.updateAdminUser(Number(req.params.id), req.body);
			if (!updatedUser) {
				return res.status(404).json({ message: 'Admin user not found.' });
			}
			res.json(updatedUser);
		} catch (error) {
			res.status(400).json({ message: 'Failed to update admin user.' });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const adminUserService = AdminUserService.getInstance();
			const deleted = await adminUserService.deleteAdminUser(Number(req.params.id));
			if (!deleted) {
				return res.status(404).json({ message: 'Admin user not found.' });
			}
			res.json({ message: 'Admin user deleted successfully.' });
		} catch (error) {
			res.status(500).json({ message: 'Failed to delete admin user.' });
		}
	}
}
