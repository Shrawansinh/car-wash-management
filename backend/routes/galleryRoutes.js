import express from "express";

import {
    addImage,
    deleteImage,
    getGallery,
    getGalleryById,
    updateImage,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.get("/:id", getGalleryById);
router.post("/", addImage);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

export default router;