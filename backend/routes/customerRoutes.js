import express from 'express';

const router = express.Router();

import {
    createCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer
} from "../controllers/customerController.js";

import { verifyToken } from '../middleware/authMiddleware.js';
router.get("/",verifyToken,authorizeRoles("admin"),getAllCustomers);;
router.get("/:id",verifyToken,authorizeRoles("admin"),getCustomerById);
//router.post("/",createCustomer);
router.put("/:id",verifyToken,authorizeRoles("admin"),updateCustomer);;
router.delete("/:id",verifyToken,authorizeRoles("admin"),deleteCustomer);
export default router;