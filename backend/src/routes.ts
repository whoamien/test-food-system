import { Router } from 'express';
import { UserLoginController } from './controller/UserLoginController';
import { AdminUserLoginController } from './controller/AdminUserLoginController';
import { AutoLoginController } from './controller/AutoLoginController';
import { adminAuthMiddleware, authMiddleware } from './middleware/AuthMiddleware';
import { FoodController } from './controller/FoodController';
import { UserController } from './controller/UserController';
import { AdminUserController } from './controller/AdminUserController';

const router = Router();
const userLoginController = new UserLoginController();
const adminUserLoginController = new AdminUserLoginController();
const autoLoginController = new AutoLoginController();
const foodController = new FoodController();
const userController = new UserController(); // Add this instance
const adminUserController = new AdminUserController();

// Public login routes
router.post('/user/login', async (req, res) => {
	try {
		await userLoginController.login(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.post('/admin/login', async (req, res) => {
	try {
		await adminUserLoginController.login(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Auto-login routes (protected)
router.get('/user/auto-login', authMiddleware, async (req, res) => {
	try {
		await autoLoginController.autoLoginUser(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.get('/admin/auto-login', adminAuthMiddleware, async (req, res) => {
	try {
		await autoLoginController.autoLoginAdmin(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Public routes
router.get('/food', async (req, res) => {
	try {
		await foodController.list(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.get('/food/:id', async (req, res) => {
	try {
		await foodController.get(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Admin routes
router.post('/food', adminAuthMiddleware, async (req, res) => {
	try {
		await foodController.create(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.put('/food/:id', adminAuthMiddleware, async (req, res) => {
	try {
		await foodController.update(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.delete('/food/:id', adminAuthMiddleware, async (req, res) => {
	try {
		await foodController.delete(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/users', adminAuthMiddleware, async (req, res) => {
	try {
		await userController.list(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/users/:id', authMiddleware, async (req, res) => {
	try {
		await userController.get(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/users', adminAuthMiddleware, async (req, res) => {
	try {
		await userController.add(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.put('/users/:id', adminAuthMiddleware, async (req, res) => {
	try {
		await userController.update(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Admin user management routes (admin only)
router.get('/admin/users', adminAuthMiddleware, async (req, res) => {
	try {
		await adminUserController.getAll(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.get('/admin/users/:id', adminAuthMiddleware, async (req, res) => {
	try {
		await adminUserController.getById(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.post('/admin/users', adminAuthMiddleware, async (req, res) => {
	try {
		await adminUserController.create(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.put('/admin/users/:id', adminAuthMiddleware, async (req, res) => {
	try {
		await adminUserController.update(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.delete('/admin/users/:id', adminAuthMiddleware, async (req, res) => {
	try {
		await adminUserController.delete(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
export default router;
