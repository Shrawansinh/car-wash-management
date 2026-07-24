import epxress from 'express';
import {
    createService,
    deleteService,
    getAllServices,
    getServiceById,
    updateService
} from "../controllers/serviceController.js";
import { authorizeRoles, verifyToken } from '../middleware/authMiddleware.js';
const router = epxress.Router();

router.get("/",getAllServices);
router.get("/:id",getServiceById);
router.post("/",verifyToken,authorizeRoles("admin"),createService);
router.put("/:id",verifyToken,authorizeRoles("admin"),updateService);
router.delete("/:id",verifyToken,authorizeRoles("admin"),deleteService);

export default router;