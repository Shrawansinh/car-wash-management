import express from "express";

import {
    createBooking,
    deleteBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    getBookingStats,
} from "../controllers/bookingController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", verifyToken,authorizeRoles("Admin"),getAllBookings);
router.get("/stats", verifyToken,authorizeRoles("Admin"),getBookingStats);

router.get("/:id",verifyToken,authorizeRoles("Admin"), getBookingById);
router.post("/", createBooking);
router.put("/:id",verifyToken,authorizeRoles("Admin"), updateBooking);
router.delete("/:id",verifyToken,authorizeRoles("Admin"), deleteBooking);

export default router;