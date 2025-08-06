import { Resident } from '../models/Resident';
import { ResidentData, ResidentCreateRequest } from '../interface/ResidentRequest';

export class ResidentRepository {
  async create(data: ResidentData): Promise<Resident> {
    return Resident.query().insert(data);
  }

  async findById(buildingId: number, residentId: number): Promise<Resident | undefined> {
    return Resident.withBuilding(buildingId)
      .findById(residentId)
      .withGraphFetched('building');
  }

  async findAll(buildingId: number): Promise<Resident[]> {
    return Resident.withBuilding(buildingId)
      .withGraphFetched('building');
  }

  async findByApartment(buildingId: number, apartmentNumber: string): Promise<Resident | undefined> {
    return Resident.withBuilding(buildingId).
      where('apartment_number', apartmentNumber).first();
  }

  async update(buildingId: number, residentId: number, data: Partial<ResidentCreateRequest>): Promise<Resident | undefined> {
    return Resident.withBuilding(buildingId)
      .patchAndFetchById(residentId, data);
  }

  async delete(buildingId: number, residentId: number): Promise<void> {
    await Resident.withBuilding(buildingId)
      .deleteById(residentId);
  }
}