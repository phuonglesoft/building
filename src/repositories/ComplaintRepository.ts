import { ComplaintCreateRequest } from '../interface/ComplaintRequest';
import { Complaint } from '../models/Complaint';

export class ComplaintRepository {
  async create(data: ComplaintCreateRequest): Promise<Complaint> {
    return Complaint.query().insert(data);
  }

  async findById(buildingId: number, complaintId: number): Promise<Complaint | undefined> {
    return Complaint.withBuilding(buildingId)
      .findById(complaintId)
      .withGraphFetched('resident')
      .withGraphFetched('building');
  }

  async findAll(buildingId: number, status?: string): Promise<Complaint[]> {
    let query = Complaint.withBuilding(buildingId)
    .withGraphFetched('resident')
    .withGraphFetched('building');
    if (status) {
      query = query.where('status', status);
    }
    return query;
  }

  async update(buildingId: number, complaintId: number, data: Partial<Complaint>): Promise<Complaint | null> {
    return Complaint.withBuilding(buildingId).patchAndFetchById(complaintId, data);
  }

  async delete(buildingId: number, complaintId: number): Promise<void> {
    await Complaint.withBuilding(buildingId).deleteById(complaintId);
  }

  async approve(buildingId: number, complaintId: number) {
    return await Complaint.withBuilding(buildingId)
    .findById(complaintId)
    .update({ status: 'RESOLVED', updated_at: new Date() })
  }

}