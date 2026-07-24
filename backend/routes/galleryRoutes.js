import express from "express";

import {
    addImage,
    deleteImage,
    getGallery,
    getGalleryById,
    updateImage,
} from "../controllers/galleryController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getGallery);
router.get("/:id", getGalleryById);
router.post("/",verifyToken,authorizeRoles("admin"), addImage);
router.put("/:id",verifyToken,authorizeRoles("admin"), updateImage);
router.delete("/:id",verifyToken,authorizeRoles("admin"), deleteImage);

export default router;