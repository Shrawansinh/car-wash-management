import express from "express";

import {
    createSlot,
    deleteSlot,
    generateDailySlots,
    getAllSlots,
    getSlotById,
    updateSlot,
} from "../controllers/timeSlotController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllSlots);
router.post("/generate", verifyToken, authorizeRoles("Admin"), generateDailySlots);
router.get("/:id", getSlotById);
router.post("/",verifyToken,authorizeRoles("Admin"), createSlot);
router.put("/:id",verifyToken,authorizeRoles("Admin"), updateSlot);
router.delete("/:id",verifyToken,authorizeRoles("Admin"), deleteSlot);

export default router;