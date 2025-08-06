
import { Request, Response } from 'express';
import { BuildingService } from '../services/BuildingService';
import { successResponse, errorResponse } from '../utils/response';


export class BuildingController {
  private buildingService: BuildingService;

  constructor() {
    this.buildingService = new BuildingService();
  }

  async createBuilding(req: Request, res: Response) {
    try {
        const data = req.body;
        const resident = await this.buildingService.createBuilding(data);
        return res.status(201).json(successResponse(resident, 'Create building successfully !'));
    } catch(error) {
        return res.status(400).json(errorResponse('Failed to create resident'));
    }
    
  }

  async getBuilding(req: Request, res: Response) {
    try {
        const { buildingId } = req.params;
        const building = await this.buildingService.getBuilding(Number(buildingId));
        if (!building) {
            return res.status(404).json(errorResponse('Resident not found'));
        }
        return res.json(successResponse(building));
    } catch(error) {
        return res.status(500).json(errorResponse('Failed to fetch resident'));
    }
    
  }

  async getAllBuildings(req: Request, res: Response) {
    try {
        const buildings = await this.buildingService.getAllBuildings();
        return res.json(successResponse(buildings));
    } catch(error) {
        return res.status(500).json(errorResponse('Failed to fetch residents'));
    }
  }
}

