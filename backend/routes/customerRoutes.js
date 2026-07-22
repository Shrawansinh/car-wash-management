import express from 'express';

const router = express.Router();

import {
    createCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer
} from "../controllers/customerController.js";


router.get("/",getAllCustomers);;
router.get("/:id",getCustomerById);
router.post("/",createCustomer);
router.put("/:id",updateCustomer);;
router.delete("/:id",deleteCustomer);
export default router;