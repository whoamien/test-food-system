import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AdminUserService } from '../service/AdminUserService';
import { AdminUser } from '../entity/AdminUser';
import { User } from '../entity/User';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		res.status(401).json({ message: 'Access denied. No token provided.' });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as {
			user: User;
			[key: string]: any;
		};
		(req as any).user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ message: 'Invalid or expired token.' });
	}
};

// Checks for a valid JWT token and admin status
export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		res.status(401).json({ message: 'Access denied. No token provided.' });
		return;
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as {
			adminUser: AdminUser;
			[key: string]: any;
		};
		(req as any).adminUser = decoded.adminUser;
		const adminUser = (req as any).adminUser;
		if (!adminUser || !adminUser.id) {
			res.status(403).json({ message: 'Admin authorization required.' });
			return;
		}
		const adminUserService = new AdminUserService();
		const isAdmin = await adminUserService.isAdminUser(adminUser.id);
		if (isAdmin) {
			next();
		} else {
			res.status(403).json({ message: 'Admin authorization required.' });
		}
	} catch (err) {
		res.status(401).json({ message: 'Invalid or expired token.' });
	}
};
