import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";

import connectDb from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import timeSlotRoutes from "./routes/timeSlotRoutes.js";

const app = express();

// ==============================
// DATABASE
// ==============================

connectDb();

// ==============================
// MIDDLEWARE
// ==============================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {
  res.send("Car wash Api running");
});

// ==============================
// ROUTES
// ==============================

app.use("/api/customers", customerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/timeslots", timeSlotRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/gallery", galleryRoutes);

// ==============================
// SERVER
// ==============================

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});