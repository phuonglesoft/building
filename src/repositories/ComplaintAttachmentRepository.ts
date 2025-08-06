import { ComplaintAttachment } from '../models/ComplaintAttachment';
import {ComplaintAttachmentCreateRequest} from '../interface/ComplaintAttachmentRequest';

export class ComplaintAttachmentRepository {
  async create(data: ComplaintAttachmentCreateRequest): Promise<ComplaintAttachment> {
    return ComplaintAttachment.query().insert(data);
  }

  async findById(buildingId: number, attachmentId: number): Promise<ComplaintAttachment | undefined> {
    return ComplaintAttachment.withBuilding(buildingId)
      .findById(attachmentId)
      .withGraphFetched('complaint');
  }

  async findByComplaint(buildingId: number, complaintId: number): Promise<ComplaintAttachment[]> {
    return ComplaintAttachment.withBuilding(buildingId)
      .where('complaint_id', complaintId)
      .withGraphFetched('complaint');
  }

  async delete(buildingId: number, attachmentId: number): Promise<void> {
    await ComplaintAttachment.withBuilding(buildingId).deleteById(attachmentId);
  }
}