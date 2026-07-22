import express from "express";

import {
    createBooking,
    deleteBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;