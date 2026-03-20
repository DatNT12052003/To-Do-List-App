import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/validation";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", authMiddleware, userController.getUser);
router.post("/", validateCreateUser, userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
