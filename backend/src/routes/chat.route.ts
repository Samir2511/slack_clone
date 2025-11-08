import express from "express";
import chatController from "../controllers/chat.controller.ts";
import { protectRoute } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.get("/token", protectRoute ,chatController.getStreamToken);

export default router;