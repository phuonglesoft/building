import { ComplaintAttachmentRepository } from '../repositories/ComplaintAttachmentRepository';
import { ValidationError } from '../middleware/errorHandler';
import { ComplaintAttachment } from '../models/ComplaintAttachment';
import { ComplaintAttachmentCreateRequest } from '../interface/ComplaintAttachmentRequest';

export class ComplaintAttachmentService {
  private complaintAttachmentRepository: ComplaintAttachmentRepository;

  constructor() {
    this.complaintAttachmentRepository = new ComplaintAttachmentRepository();
  }

  async createAttachment(
    complaintId: number,
    buildingId: number,
    uploadedById: number,
    data: ComplaintAttachmentCreateRequest
  ): Promise<ComplaintAttachment> {
    if (!data.file_name || data.file_name.length > 255) {
      throw new ValidationError('File name is required and must be less than 255 characters');
    }
    if (!data.file_path || data.file_path.length > 500) {
      throw new ValidationError('File path is required and must be less than 500 characters');
    }
    if (!data.file_size || data.file_size <= 0) {
      throw new ValidationError('File size must be greater than 0');
    }
    if (!data.mime_type || data.mime_type.length > 100) {
      throw new ValidationError('MIME type is required and must be less than 100 characters');
    }

    const attachmentData = {
      ...data,
      complaint_id: complaintId,
      building_id: buildingId,
      uploaded_by_id: uploadedById
    };

    return this.complaintAttachmentRepository.create(attachmentData);
  }

  async getAttachment(buildingId: number, attachmentId: number): Promise<ComplaintAttachment | null> {
    const attachment = await this.complaintAttachmentRepository.findById(buildingId, attachmentId);
    if (!attachment) {
      throw new ValidationError('Attachment not found');
    }
    return attachment;
  }

  async getAttachmentsByComplaint(buildingId: number, complaintId: number): Promise<ComplaintAttachment[]> {
    return this.complaintAttachmentRepository.findByComplaint(buildingId, complaintId);
  }


  async deleteAttachment(buildingId: number, attachmentId: number): Promise<void> {
    const attachment = await this.complaintAttachmentRepository.findById(buildingId, attachmentId);
    if (!attachment) {
      throw new ValidationError('Attachment not found');
    }
    await this.complaintAttachmentRepository.delete(buildingId, attachmentId);
  }

  async deleteAttachmentsByComplaint(buildingId: number, complaintId: number): Promise<void> {
    await this.complaintAttachmentRepository.delete(buildingId, complaintId);
  }
}