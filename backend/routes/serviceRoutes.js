import epxress from 'express';
const router = epxress.Router();

import {
    createService,
    deleteService,
    getAllServices,
    getServiceById,
    updateService
} from "../controllers/serviceController.js";

router.get("/",getAllServices);
router.get("/:id",getServiceById);
router.post("/",createService);
router.put("/:id",updateService);
router.delete("/:id",deleteService);

export default router;