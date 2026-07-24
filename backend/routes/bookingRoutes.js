import express from "express";

import {
    createBooking,
    deleteBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
} from "../controllers/bookingController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", verifyToken,authorizeRoles("admin"),getAllBookings);
router.get("/:id",verifyToken,authorizeRoles("admin"), getBookingById);
router.post("/", createBooking);
router.put("/:id",verifyToken,authorizeRoles("admin"), updateBooking);
router.delete("/:id",verifyToken,authorizeRoles("admin"), deleteBooking);

export default router;