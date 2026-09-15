import express from "express";

import {
    createService,
    deleteService,
    getAllServices,
    getServiceById,
    updateService,
} from "../controllers/serviceController.js";

import {
    authorizeRoles,
    verifyToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllServices);

router.get("/:id", getServiceById);

// Admin routes
router.post(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  createService
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  updateService
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  deleteService
);

export default router;