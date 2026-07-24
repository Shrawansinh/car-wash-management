import express from "express";

import {
    createSlot,
    deleteSlot,
    getAllSlots,
    getSlotById,
    updateSlot,
} from "../controllers/timeSlotController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllSlots);
router.get("/:id", getSlotById);
router.post("/",verifyToken,authorizeRoles("admin"), createSlot);
router.put("/:id",verifyToken,authorizeRoles("admin"), updateSlot);
router.delete("/:id",verifyToken,authorizeRoles("admin"), deleteSlot);

export default router;