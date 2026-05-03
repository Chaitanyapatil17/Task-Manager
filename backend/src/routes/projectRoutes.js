import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";
import { createProject, getProjects, addMember } from "../controllers/projectController.js";

const router = express.Router();

router.post("/", authMiddleware, adminOnly, createProject);
router.get("/", authMiddleware, getProjects);
router.post("/add-member", authMiddleware, adminOnly, addMember);

export default router;