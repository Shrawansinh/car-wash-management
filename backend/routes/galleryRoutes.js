import express from "express";

import {
    addImage,
    deleteImage,
    getGallery,
    getGalleryById,
    updateImage,
} from "../controllers/galleryController.js";

import {
    authorizeRoles,
    verifyToken,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getGallery);

router.get("/:id", getGalleryById);

router.post(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  upload.single("image"),
  addImage
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  upload.single("image"),
  updateImage
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  deleteImage
);
router.use((err, req, res, next) => {
  console.error("GALLERY ROUTE ERROR:", err);
  console.error("ERROR MESSAGE:", err?.message);
  console.error("ERROR STACK:", err?.stack);

  res.status(500).json({
    success: false,
    message: err?.message || "Gallery upload error",
  });
});
export default router;