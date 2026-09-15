import cloudinary from "../config/cloudinary.js";
import Gallery from "../models/Gallery.js";

// Upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "maa-nagneshwari-carwash/gallery",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("========== CLOUDINARY ERROR ==========");
console.error("MESSAGE:", error?.message);
console.error("HTTP CODE:", error?.http_code);
console.error("NAME:", error?.name);
console.error("FULL ERROR:", error);
console.error("======================================");
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(buffer);
  });
};


// GET ALL
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.error("Get gallery error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET SINGLE
export const getGalleryById = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Get gallery by id error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ADD IMAGE
export const addImage = async (req, res) => {
  try {
    console.log("FILE RECEIVED:", !!req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    console.log("Uploading image to Cloudinary...");

    const result = await uploadToCloudinary(req.file.buffer);

    console.log("CLOUDINARY URL:", result.secure_url);

    const image = await Gallery.create({
      title: req.body.title,
      image: result.secure_url,
      description: req.body.description || "",
      isActive: req.body.isActive === "false" ? false : true,
    });

    res.status(201).json({
      success: true,
      message: "Image added successfully",
      data: image,
    });
  } catch (error) {
    console.error("ADD IMAGE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error?.message || "Failed to upload image",
    });
  }
};


// UPDATE IMAGE
export const updateImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    image.title = req.body.title;
    image.description = req.body.description || "";

    if (req.body.isActive !== undefined) {
      image.isActive =
        req.body.isActive === "false" ? false : true;
    }

    // New image selected
    if (req.file) {
      console.log("Uploading new image...");

      const result = await uploadToCloudinary(req.file.buffer);

      console.log(
        "NEW CLOUDINARY URL:",
        result.secure_url
      );

      image.image = result.secure_url;
    }

    await image.save();

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: image,
    });
  } catch (error) {
    console.error("UPDATE IMAGE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error?.message || "Failed to update image",
    });
  }
};


// DELETE IMAGE
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Delete from Cloudinary
    if (image.image) {
      try {
        const uploadIndex = image.image.indexOf("/upload/");

        if (uploadIndex !== -1) {
          let publicId = image.image.substring(
            uploadIndex + 8
          );

          publicId = publicId.replace(
            /^v\d+\//,
            ""
          );

          publicId = publicId.replace(
            /\.[^/.]+$/,
            ""
          );

          await cloudinary.uploader.destroy(publicId);
        }
      } catch (error) {
        console.error(
          "Cloudinary delete error:",
          error
        );
      }
    }

    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("DELETE IMAGE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};