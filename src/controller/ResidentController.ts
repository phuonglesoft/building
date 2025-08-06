
import { Request, Response } from 'express';
import { ResidentService } from '../services/ResidentService';
import { successResponse, errorResponse } from '../utils/response';

export class ResidentController {
  private residentService: ResidentService;

  constructor() {
    this.residentService = new ResidentService();
  }

  async createResident(req: Request, res: Response) {
    try {
      const { buildingId } = req.params;
      const data = req.body;
      const resident = await this.residentService.createResident(Number(buildingId), data);
      return res.status(201).json(successResponse(resident, 'Resident created successfully'));
    } catch (error) {
      return res.status(400).json(errorResponse('Failed to create resident'));
    }
  }

  async getResident(req: Request, res: Response) {
    try {
      const { buildingId, residentId } = req.params;
      const resident = await this.residentService.getResident(Number(buildingId), Number(residentId));
      if (!resident) {
        return res.status(404).json(errorResponse('Resident not found'));
      }
      return res.json(successResponse(resident));
    } catch (error) {
      return res.status(500).json(errorResponse('Failed to fetch resident'));
    }
  }

  async getAllResidents(req: Request, res: Response) {
    try {
      const { buildingId } = req.params;
      const residents = await this.residentService.getAllResidents(Number(buildingId));
      return res.json(successResponse(residents, 'Residents fetched successfully', { total: residents.length }));
    } catch (error) {
      return res.status(500).json(errorResponse('Failed to fetch residents'));
    }
  }

  async updateResident(req: Request, res: Response) {
    try {
      const { buildingId, residentId } = req.params;
      const data = req.body;
      const resident = await this.residentService.updateResident(Number(buildingId), Number(residentId), data);
      if (!resident) {
        return res.status(404).json(errorResponse('Resident not found'));
      }
      return res.json(successResponse(resident, 'Resident updated successfully'));
    } catch (error) {
      return res.status(400).json(errorResponse('Failed to update resident'));
    }
  }

  async deleteResident(req: Request, res: Response) {
    try {
      const { buildingId, residentId } = req.params;
      await this.residentService.deleteResident(Number(buildingId), Number(residentId));
      return res.status(204).json(successResponse(null, 'Resident deleted successfully')); // Không có data, dùng 204
    } catch (error) {
      return res.status(500).json(errorResponse('Failed to delete resident'));
    }
  }
}