import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// @desc    Admin Login
// @route   POST /api/admin/login
export const createAdmin = async (req,res)=>{
  try{
    const {name , email , password} = req.body;
    const existingAdmin = await Admin.findOne({ email});
    if(existingAdmin){
      return res.status(500).json({
        success:false,
        message:"Admin alerady exists",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success:true,
      message:"Admin created successfully",
      data:admin
    })
  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message,
    });
  }
};
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
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch){
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }
    // after succesful Login we will generate jwt tokens and send it to the client
    const token = jwt.sign({
      id:admin._id,
      email:admin.email,
      role: admin.role
    }, process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRE,
    });
    // JWT & bcrypt validation Day 3 me add karenge
const adminResponse = admin.toObject();
delete adminResponse.password;
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: adminResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Admin Profile
// @route   GET /api/admin/profile
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if(!admin){
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