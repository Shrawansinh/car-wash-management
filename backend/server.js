import cors from 'cors';
import dotenv from 'dotenv'; // read the env file
import express from 'express';
import connectDb from './config/db.js';

const app = express();
dotenv.config();
// middleware
connectDb();
app.use(cors());
app.use(express.json()); // it is used to read the json onjec which is come form the userSelect: 
app.get("/",(req,res)=>{
    res.send("Car wash Api running");
});
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
