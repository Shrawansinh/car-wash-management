import express from "express";

import {
    createSlot,
    deleteSlot,
    getAllSlots,
    getSlotById,
    updateSlot,
} from "../controllers/timeSlotController.js";

const router = express.Router();

router.get("/", getAllSlots);
router.get("/:id", getSlotById);
router.post("/", createSlot);
router.put("/:id", updateSlot);
router.delete("/:id", deleteSlot);

export default router;