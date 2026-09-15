import express from "express";

import {
    createAdmin,
    getProfile,
    loginAdmin,
    logoutAdmin,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
// first create admin without this tokens ....
router.post("/",createAdmin);
router.post("/login", loginAdmin);
router.post("/logout", verifyToken,logoutAdmin);

// proteted route
router.get("/profile", verifyToken,getProfile);

export default router;