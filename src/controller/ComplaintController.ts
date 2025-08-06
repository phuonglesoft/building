
import { Request, Response } from 'express';
import { ComplaintService } from '../services/ComplaintService'; // Giả định có service này
import { successResponse, errorResponse } from '../utils/response';

export class ComplaintController {
  private complaintService: ComplaintService;

  constructor() {
    this.complaintService = new ComplaintService();
  }

  async createComplaint(req: Request, res: Response) {
    try {
      const { buildingId } = req.params;
      const data = req.body;
      if (!req.user?.role.includes('admin') && !req.user?.role.includes('building_manager')) {
        return res.status(403).json(errorResponse('Unauthorized: Only admin or building manager can create complaints'));
      }
      const complaint = await this.complaintService.createComplaint(Number(buildingId), data);
      return res.status(201).json(successResponse(complaint, 'Complaint created successfully'));
    } catch (error) {
      return res.status(400).json(errorResponse('Failed to create complaint'));
    }
  }

  async approveComplaint(req: Request, res: Response) {
    try {
      const { buildingId, complaintId } = req.params;
      if (!req.user?.role.includes('admin') && !req.user?.role.includes('building_manager')) {
        return res.status(403).json(errorResponse('Unauthorized: Only admin or building manager can approve complaints'));
      }
      const complaint = await this.complaintService.approveComplaint(Number(buildingId), Number(complaintId));
      if (!complaint) {
        return res.status(404).json(errorResponse('Complaint not found'));
      }
      return res.json(successResponse(complaint, 'Complaint approved successfully'));
    } catch (error) {
      return res.status(400).json(errorResponse('Failed to approve complaint'));
    }
  }

  async getComplaint(req: Request, res: Response) {
    try {
      const { buildingId, complaintId } = req.params;
      const complaint = await this.complaintService.getComplaint(Number(buildingId), Number(complaintId));
      if (!complaint) {
        return res.status(404).json(errorResponse('Complaint not found'));
      }
      return res.json(successResponse(complaint));
    } catch (error) {
      return res.status(500).json(errorResponse('Failed to fetch complaint'));
    }
  }
}