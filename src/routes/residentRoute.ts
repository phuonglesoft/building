
import express from 'express';
import { ResidentController } from '../controller/ResidentController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
const residentController = new ResidentController();

router.post('/buildings/:buildingId/residents', authMiddleware, residentController.createResident.bind(residentController));
router.get('/buildings/:buildingId/residents/:residentId', authMiddleware, residentController.getResident.bind(residentController));
router.get('/buildings/:buildingId/residents', authMiddleware, residentController.getAllResidents.bind(residentController));
router.patch('/buildings/:buildingId/residents/:residentId', authMiddleware,  residentController.updateResident.bind(residentController));
router.delete('/buildings/:buildingId/residents/:residentId', authMiddleware, residentController.deleteResident.bind(residentController));

export const residentRoutes = router;
