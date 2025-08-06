
import express from 'express';
import { ComplaintController } from '../controller/ComplaintController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
const complaintController = new ComplaintController();

router.post('/buildings/:buildingId/complaints', authMiddleware, complaintController.createComplaint.bind(complaintController));
router.post('/buildings/:buildingId/complaints/:complaintId/approve', authMiddleware, complaintController.approveComplaint.bind(complaintController));
router.get('/buildings/:buildingId/complaints/:complaintId', authMiddleware, complaintController.getComplaint.bind(complaintController));

export const complaintRoutes = router;