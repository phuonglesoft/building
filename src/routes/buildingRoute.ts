
import express from 'express';
import { BuildingController } from '../controller/BuildingController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
const buildingController = new BuildingController();

router.post('/buildings/', authMiddleware, buildingController.createBuilding.bind(buildingController));
router.get('/buildings/:buildingId/', authMiddleware, buildingController.getBuilding.bind(buildingController));
router.get('/buildings/', authMiddleware, buildingController.getAllBuildings.bind(buildingController));
export const buildingRoutes = router;
