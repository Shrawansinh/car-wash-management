import express from "express";

import {
    getProfile,
    loginAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/profile", getProfile);

export default router;