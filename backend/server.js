import cors from 'cors';
import dotenv from 'dotenv'; // read the env file
import express from 'express';
import connectDb from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

const app = express();
dotenv.config();
// middleware
connectDb();
app.use(cors());
app.use(express.json()); // it is used to read the json onjec which is come form the userSelect: 
app.get("/",(req,res)=>{
    res.send("Car wash Api running");
});

// all routes connection 

app.use("/api/customers",customerRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/timeslots",timeSlotROutes);
app.use("/api/admin",adminRoutes);
app.use("/api/gallary",galleryRoutes);
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
