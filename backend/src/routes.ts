import { Router } from "express";
import { UserLoginController } from "./controller/UserLoginController";
import { AdminUserController } from "./controller/AdminUserController";
import { AutoLoginController } from "./controller/AutoLoginController";
import {
  adminAuthMiddleware,
  authMiddleware,
} from "./middleware/AuthMiddleware";
import { FoodController } from "./controller/FoodController";

const router = Router();
const userLoginController = new UserLoginController();
const adminUserController = new AdminUserController();
const autoLoginController = new AutoLoginController();
const controller = new FoodController();

// Public login routes
router.post("/user/login", (req, res) => userLoginController.login(req, res));
router.post("/admin/login", (req, res) => adminUserController.login(req, res));

// Auto-login routes (protected)
router.get("/user/auto-login", authMiddleware, (req, res) =>
  autoLoginController.autoLoginUser(req, res),
);
router.get("/admin/auto-login", authMiddleware, (req, res) =>
  autoLoginController.autoLoginAdmin(req, res),
);

// Public routes
router.get("/", (req, res) => controller.list(req, res));
router.get("/:id", (req, res) => controller.get(req, res));

// Admin routes
router.post("/", adminAuthMiddleware, (req, res) =>
  controller.create(req, res),
);
router.put("/:id", adminAuthMiddleware, (req, res) =>
  controller.update(req, res),
);
router.delete("/:id", adminAuthMiddleware, (req, res) =>
  controller.delete(req, res),
);

export default router;
