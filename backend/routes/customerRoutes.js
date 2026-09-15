import express from "express";

import {
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
} from "../controllers/customerController.js";

import {
    authorizeRoles,
    verifyToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all customers - Admin only
router.get(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  getAllCustomers
);

// Get single customer - Admin only
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  getCustomerById
);

// Update customer - Admin only
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  updateCustomer
);

// Delete customer - Admin only
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  deleteCustomer
);

export default router;