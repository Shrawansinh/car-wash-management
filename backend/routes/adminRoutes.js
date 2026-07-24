import express from "express";

import {
    createAdmin,
    getProfile,
    loginAdmin,
} from "../controllers/adminController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",verifyToken,authorizeRoles("admin"),createAdmin);
router.post("/login", loginAdmin);

// proteted route
router.get("/profile", verifyToken,getProfile);

export default router;