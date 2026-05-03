import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController.js";

const router = express.Router();

// Create task
router.post("/", authMiddleware, createTask);

// Get tasks
router.get("/", authMiddleware, getTasks);

// Update status
router.put("/:id", authMiddleware, updateTaskStatus);

export default router;