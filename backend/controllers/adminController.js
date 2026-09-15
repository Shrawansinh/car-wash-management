
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";


// ==============================
// CREATE ADMIN
// ==============================

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(500).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==============================
// ADMIN LOGIN
// ==============================

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==============================
    // CREATE JWT
    // ==============================

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );


    // ==============================
    // STORE JWT IN HTTPONLY COOKIE
    // ==============================

    res.cookie("token", token, {
      httpOnly: true,

      // HTTPS required in production
      secure: process.env.NODE_ENV === "production",

      // Localhost -> lax
      // Production cross-domain -> none
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",

      // Cookie expires according to JWT lifetime
      maxAge: 24 * 60 * 60 * 1000,
    });


    // ==============================
    // REMOVE PASSWORD FROM RESPONSE
    // ==============================

    const adminResponse = admin.toObject();

    delete adminResponse.password;


    // ==============================
    // SEND RESPONSE
    // ==============================

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: adminResponse,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==============================
// GET ADMIN PROFILE
// ==============================

export const getProfile = async (req, res) => {
  try {

    const admin = await Admin.findById(
      req.admin.id
    ).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};