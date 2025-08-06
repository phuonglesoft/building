import { ComplaintRepository } from '../repositories/ComplaintRepository';
import { ValidationError } from '../middleware/errorHandler';
import { Complaint } from '../models/Complaint';
import {ComplaintCreateRequest, ComplaintUpdateRequest} from '../interface/ComplaintRequest';
import { uploadToS3 } from '../utils/s3Upload';

export class ComplaintService {
  private complaintRepository: ComplaintRepository;

  constructor() {
    this.complaintRepository = new ComplaintRepository();
  }

  async createComplaint(
    buildingId: number, 
    data: ComplaintCreateRequest
  ): Promise<Complaint> {
    if (!data.title || data.title.length > 200) {
      throw new ValidationError('Title is required and must be less than 200 characters');
    }
    if (!data.description || data.description.length < 10) {
      throw new ValidationError('Description is required and must be at least 10 characters');
    }
    if (!data.category) {
      throw new ValidationError('Category is required');
    }
    if (!data.priority) {
      throw new ValidationError('Priority is required');
    }

    const complaintData = {
      ...data,
      building_id: buildingId,
      status: 'pending' as const
    };

    return this.complaintRepository.create(complaintData);
  }

  async getComplaint(buildingId: number, complaintId: number): Promise<Complaint | null> {
    const complaint = await this.complaintRepository.findById(buildingId, complaintId);
    if (!complaint) {
      throw new ValidationError('Complaint not found');
    }
    return complaint;
  }

  async getAllComplaints(buildingId: number): Promise<Complaint[]> {
    return this.complaintRepository.findAll(buildingId);
  }

  async approveComplaint(buildingId: number, complaintId: number) {
    const complaint = await this.complaintRepository.findById(buildingId, complaintId);
    if (!complaint) throw new Error('Complaint not found');
    if (complaint.status === 'RESOLVED') throw new Error('Complaint already approved');
    return this.complaintRepository.approve(buildingId, complaintId);
  }


  async updateComplaint(
    buildingId: number, 
    complaintId: number, 
    data: ComplaintUpdateRequest
  ): Promise<Complaint | null> {
    if (data.title && data.title.length > 200) {
      throw new ValidationError('Title must be less than 200 characters');
    }
    if (data.description && data.description.length < 10) {
      throw new ValidationError('Description must be at least 10 characters');
    }

    const complaint = await this.complaintRepository.update(buildingId, complaintId, data);
    if (!complaint) {
      throw new ValidationError('Complaint not found');
    }
    return complaint;
  }


  async deleteComplaint(buildingId: number, complaintId: number): Promise<void> {
    const complaint = await this.complaintRepository.findById(buildingId, complaintId);
    if (!complaint) {
      throw new ValidationError('Complaint not found');
    }
    await this.complaintRepository.delete(buildingId, complaintId);
  }
}