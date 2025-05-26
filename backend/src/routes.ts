import { Router } from "express";
import { UserLoginController } from "./controller/UserLoginController";
import { AdminUserController } from "./controller/AdminUserController";
import { AutoLoginController } from "./controller/AutoLoginController";
import { authMiddleware } from "./middleware/AuthMiddleware";

const router = Router();
const userLoginController = new UserLoginController();
const adminUserController = new AdminUserController();
const autoLoginController = new AutoLoginController();

// Public login routes
router.post("/user/login", (req, res) => userLoginController.login(req, res));
router.post("/admin/login", (req, res) => adminUserController.login(req, res));

// Auto-login routes (protected)
router.get("/user/auto-login", authMiddleware, (req, res) => autoLoginController.autoLoginUser(req, res));
router.get("/admin/auto-login", authMiddleware, (req, res) => autoLoginController.autoLoginAdmin(req, res));

export default router;