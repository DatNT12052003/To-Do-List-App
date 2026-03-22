import { Router } from "express";
import * as postController from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, postController.createPostController);
router.post("/:id/publish", authMiddleware, postController.publishPostController);
router.post("/:id/unpublish", authMiddleware, postController.unpublishPostController);
router.get("/", authMiddleware, postController.getPostsController);

export default router;
